import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Product Manager</h1>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#home" className="hover:text-gray-200">Home</a></li>
          <li><a href="#products" className="hover:text-gray-200">Products</a></li>
          <li><a href="#about" className="hover:text-gray-200">About</a></li>
          <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
        </ul>
        {/* Mobile Menu Toggle */}
        <div className="block md:hidden">
          <button className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
