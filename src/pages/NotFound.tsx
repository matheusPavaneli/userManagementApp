import { BsEmojiDizzy } from 'react-icons/bs';

function NotFound() {
  return (
    <div className="flex justify-center px-2 py-5 font-jetbrains">
      <main className="w-full max-w-lg bg-gray-100 rounded-xl shadow-2xl p-5 flex flex-col gap-8">
        <div>
          <div className="flex justify-center items-center flex-col h-72 w-3/4  text-black mx-auto rounded-lg">
            <BsEmojiDizzy size={'4em'} className="mb-5" />
            <h2>404</h2>
            <p>Not Found</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
