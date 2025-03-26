import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">URL Shortner</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Sign In
          </Link>
          <Link to="/signout" className="text-gray-300 hover:text-white">
            Sign Out
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
