const Nav = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-around">
        <a href="#bands" className="text-white text-lg hover:text-blue-200">
          Bands
        </a>
        <a href="#albums" className="text-white text-lg hover:text-blue-200">
          Albums
        </a>
        <a href="#songs" className="text-white text-lg hover:text-blue-200">
          Songs
        </a>
      </div>
    </nav>
  );
};

export default Nav;
