import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="text-white text-lg hover:text-blue-200">
          Bands
        </Link>
        <Link to="/album" className="text-white text-lg hover:text-blue-200">
          Albums
        </Link>
        <Link to="/songs" className="text-white text-lg hover:text-blue-200">
          Songs
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
