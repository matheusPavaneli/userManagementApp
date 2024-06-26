import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';

import IUser from '../interfaces/IUser';
import { registerRequest } from '../features/UserSlice';

function Register() {
  const user = useSelector((state: IUser) => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showingPassword, setShowingPassword] = useState(false);
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogged) {
      return navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      return toast.error('You need to accept the terms of use');
    }

    dispatch(registerRequest({ username, email, password, confirmPassword }));
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
              <h2 className="font-bold text-lg">Register an account</h2>
              <p className="text-sm text-gray-400 text-center">
                Sign up to your account and test this project
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="How can I call you?"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="roundCheckbox"
                  className="hidden"
                  onClick={() => setIsChecked(!isChecked)}
                />
                <label
                  htmlFor="roundCheckbox"
                  className="flex items-center cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-ful mr-2 flex items-center justify-center">
                    {isChecked ? (
                      <RiCheckboxCircleLine className="w-8 h-8 text-black" />
                    ) : (
                      <RiCheckboxBlankCircleLine className="w-8 h-8 text-black" />
                    )}
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm break-words px-2">
                    I have read and accept all user terms.
                  </span>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  Create Account
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-sm text-gray-500 pt-3">
              Have you been here before?{' '}
              <Link
                to="/"
                className="font-bold text-gray-700 underline whitespace-nowrap cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Register;
