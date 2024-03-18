import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import { verify2FARequest } from '../features/UserSlice';
import IUser from '../interfaces/IUser';

function Verify2FA() {
  const user = useSelector((state: IUser) => state.user);
  const [verifyCode, setVerifyCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged || user.twoFactorChecked) {
      return navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(verify2FARequest({ verifyCode }));

    if (user.twoFactorChecked || user.success) {
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
    <div className="flex justify-center px-2 py-5 font-jetbrains">
      <main className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-5 flex flex-col gap-8">
        <div>
          <div className="flex justify-center items-center h-72 w-3/4  text-white mx-auto rounded-lg">
            <img src={user.twoStepQRCodeUrl} alt="" className="w-64 h-64" />
          </div>
          <div className="text-gray-400 text-center mt-2">
            <span>Tip: use Google Authenticator or Authy</span>
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="verifyCode" className="block">
              Verify Code
            </label>
            <input
              type="text"
              name="verifyCode"
              id="verifyCode"
              placeholder="EX: 111111"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-400 focus:text-black focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setVerifyCode(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-">
            <button
              type="submit"
              className="text-center text-xl font-semibold w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
            >
              Verify
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Verify2FA;
