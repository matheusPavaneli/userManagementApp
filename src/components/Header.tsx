import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation(); // Este hook é necessário para acessar a localização atual

  return (
    <header className="w-full">
      <div className="flex flex-row justify-end items-start pt-4 pr-4">
        {location.pathname === '/signin' ? (
          <Link to="/" className="text-sm font-semibold">
            Sign Up
          </Link>
        ) : (
          <Link to="/signin" className="text-sm font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
