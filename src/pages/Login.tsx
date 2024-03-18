import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequest } from '../features/UserSlice';
import IUser from '../interfaces/IUser';

function Login() {
  const user = useSelector((state: IUser) => state.user);
  const [showingPassword, setShowingPassword] = useState(false);
  const [loginContent, setLoginContent] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogged) {
      return navigate('/dashboard');
    }
  }, [user.isLogged, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ loginContent, password }));
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
              <h2 className="font-bold text-lg">Login an account</h2>
              <p className="text-sm text-gray-400 text-center">
                Sign up to your account and test this project
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="loginMethod"
                  className="block text-sm font-semibold"
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  id="loginContent"
                  placeholder="How can we call you?"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  onChange={(e) => setLoginContent(e.target.value)}
                />
              </div>
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
                <div>
                  <p className="text-start text-sm text-gray-500">
                    Don't remember the password?{' '}
                    <Link
                      to="/forgot-password"
                      className="font-bold text-gray-700 underline whitespace-nowrap cursor-pointer"
                    >
                      Reset
                    </Link>
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-sm text-gray-500 pt-3">
              Haven't you been here before?{' '}
              <Link
                to="/signup"
                className="font-bold text-gray-700 underline whitespace-nowrap cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
