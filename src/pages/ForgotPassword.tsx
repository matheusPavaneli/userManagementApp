import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import IUser from '../interfaces/IUser';
import { forgotPasswordRequest } from '../features/UserSlice';

function ForgotPassword() {
  const user = useSelector((state: IUser) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user.isLogged) {
      return navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest({ email }));
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
              <h2 className="font-bold text-lg">Forgot Password</h2>
              <p className="text-sm text-gray-400 text-center">
                Don't remember your password? just reset
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@domain.com"
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
