import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import IUser from '../interfaces/IUser';
import { resetPasswordRequest } from '../features/UserSlice';

function ResetPassword() {
  const user = useSelector((state: IUser) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showingPassword, setShowingPassword] = useState(false);
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false);

  useEffect(() => {
    if (user.isLogged) {
      return navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = location.pathname.split('/').pop()!;
    dispatch(resetPasswordRequest({ password, confirmPassword, token }));

    if (user.success) {
      return navigate('/');
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
    <div>
      <main className="flex justify-center min-h-screen px-2 font-jetbrains">
        <section className="w-full max-w-lg flex justify-center items-center">
          <div className="bg-gray-100 w-full max-w-md p-5 rounded-xl shadow-2xl">
            <div className="flex flex-col items-center pb-8">
              <h2 className="font-bold text-lg">Reset Password</h2>
              <p className="text-sm text-gray-400 text-center">
                Enter the new password and connect to your account!
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showingPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="********"
                    className="mt-1 w-full border rounded-lg px-3 py-2 pr-10"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowingPassword(!showingPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showingPassword ? (
                      <FaRegEyeSlash className="text-lg" />
                    ) : (
                      <FaRegEye className="text-lg" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showingConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="********"
                    className="mt-1 w-full border rounded-lg px-3 py-2 pr-10"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowingConfirmPassword(!showingConfirmPassword)
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showingConfirmPassword ? (
                      <FaRegEyeSlash className="text-lg" />
                    ) : (
                      <FaRegEye className="text-lg" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResetPassword;
