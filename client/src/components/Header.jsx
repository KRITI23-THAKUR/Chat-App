import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-neutral-900 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center h-24 px-6">
        
        <div className="flex items-center">
          <h3 className="text-amber-50 text-xl font-bold">Logo</h3>
        </div>

        
        <div className="flex space-x-6 text-white">
           
           {/* <Link> <buton onClick={logout}>Logout</buton></Link> */}
          <Link to="/login" className="hover:text-amber-500">
            Login
          </Link>
          <Link to="/signup" className="hover:text-amber-500">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
