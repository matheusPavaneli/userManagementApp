import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import IUser from '../interfaces/IUser';
import ITokenPayload from '../interfaces/ITokenPayload';
import {
  active2FARequest,
  deleteRequest,
  logoutRequest,
  updateUserRequest,
  uploadImageRequest,
} from '../features/UserSlice';

function Dashboard() {
  const user = useSelector((state: IUser) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user.imageUrl || '');

  useEffect(() => {
    if (!user.isLogged) {
      return navigate('/');
    }

    if (user.twoStep && !user.twoFactorChecked) {
      return navigate('/verify2FA');
    }

    const token: ITokenPayload = jwtDecode(user.token);
    setUsername(token.username);
    setEmail(token.email);
    setPassword('');
  }, [
    user.isLogged,
    user.token,
    user.twoStep,
    user.twoFactorChecked,
    navigate,
  ]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateUserRequest({ username, email, password }));
  };

  const handleActive2FA = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(active2FARequest());
    return navigate('/verify2FA');
  };

  const handleDesactive2FA = (e: React.MouseEvent) => {
    e.preventDefault();
    return navigate('/desactive2FA');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(deleteRequest());
    if (user.success) {
      return navigate('/');
    }
  };

  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      dispatch(uploadImageRequest(formData));
    }
  };

  if (user.isLoading) {
    return (
      <div className="flex justify-center items-center px-2 py-5 font-jetbrains">
        <main className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-5 flex flex-col gap-8">
          <div>
            <div className="flex justify-center items-center flex-col h-72 w-3/4  text-black mx-auto rounded-lg">
              <AiOutlineLoading size={'4em'} className="mb-5 animate-spin" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-2 py-5 font-jetbrains">
      <main className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-5 flex flex-col gap-8">
        <div className="flex justify-center flex-col items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />

            {previewUrl ? (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={previewUrl}
                alt="Preview"
              />
            ) : user.imageUrl ? (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={user.imageUrl}
                alt="User"
              />
            ) : (
              <CgProfile className="w-24 h-24 text-gray-700 hover:opacity-60 rounded-full" />
            )}
          </label>
          <button onClick={(e) => handleUpload(e)}>Upload</button>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-400 focus:text-black"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>{' '}
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-400 focus:text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>{' '}
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-400 focus:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-4">
            {user.twoFactorChecked ? (
              <button
                onClick={(e) => handleDesactive2FA(e)}
                className="text-center text-xl font-semibold w-1/2 bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200"
              >
                Desactive 2FA
              </button>
            ) : (
              <button
                onClick={(e) => handleActive2FA(e)}
                className="text-center text-xl font-semibold w-1/2 bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 transition-colors duration-200"
              >
                Active 2FA
              </button>
            )}
            <button
              onClick={(e) => handleSave(e)}
              className="text-center text-xl font-semibold w-1/2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-auto flex justify-between">
          <button
            onClick={(e) => handleDelete(e)}
            className="text-center text-xl font-semibold w-1/2 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => handleLogout()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <IoExitOutline size="1.5em" className="text-red-800" />
            <span className="text-red-800">Log Out</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
