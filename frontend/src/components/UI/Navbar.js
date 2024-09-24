import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/">
                <svg
                  className="h-8 w-20 text-primaryOrange-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

		<path d="M7.592,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.768,0,3.203-1.434,3.203-3.204
			S9.36,16.86,7.592,16.86z M7.592,21.032c-0.532,0-0.968-0.434-0.968-0.967s0.436-0.967,0.968-0.967
			c0.531,0,0.966,0.434,0.966,0.967S8.124,21.032,7.592,21.032z" fill="currentColor"/>
		<path d="M30.915,17.439l-0.524-4.262c-0.103-0.818-0.818-1.418-1.643-1.373L27.6,11.868l-3.564-3.211
			c-0.344-0.309-0.787-0.479-1.249-0.479l-7.241-0.001c-1.625,0-3.201,0.555-4.468,1.573l-4.04,3.246l-5.433,1.358
			c-0.698,0.174-1.188,0.802-1.188,1.521v1.566C0.187,17.44,0,17.626,0,17.856v2.071c0,0.295,0.239,0.534,0.534,0.534h3.067
			c-0.013-0.133-0.04-0.26-0.04-0.396c0-2.227,1.804-4.029,4.03-4.029s4.029,1.802,4.029,4.029c0,0.137-0.028,0.264-0.041,0.396
			h8.493c-0.012-0.133-0.039-0.26-0.039-0.396c0-2.227,1.804-4.029,4.029-4.029c2.227,0,4.028,1.802,4.028,4.029
			c0,0.137-0.026,0.264-0.04,0.396h2.861c0.295,0,0.533-0.239,0.533-0.534v-1.953C31.449,17.68,31.21,17.439,30.915,17.439z
			 M20.168,12.202l-10.102,0.511L12,11.158c1.051-0.845,2.357-1.305,3.706-1.305h4.462V12.202z M21.846,12.117V9.854h0.657
			c0.228,0,0.447,0.084,0.616,0.237l2.062,1.856L21.846,12.117z" fill="currentColor"/>
		<path d="M24.064,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.769,0,3.203-1.434,3.203-3.204
			S25.833,16.86,24.064,16.86z M24.064,21.032c-0.533,0-0.967-0.434-0.967-0.967s0.434-0.967,0.967-0.967
			c0.531,0,0.967,0.434,0.967,0.967S24.596,21.032,24.064,21.032z" fill="currentColor"/>
                </svg>
              </NavLink>
              <NavLink to="/">
              <span className="text-3xl font-bold px-3">CarGo</span>
              </NavLink>
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className={
                "text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 "
              }
              aria-label="toggle menu"
              onClick={() => setIsToggle(!isToggle)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              </svg>
            </button>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">
            <NavLink
              to="/login"
              className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
            >
              Signup
            </NavLink>
          </div>
        </div>
      </div>
      <div id="menu" className={"sm:hidden " + (isToggle ? "hidden" : null)}>
        <NavLink
          to="/support"
          className="block px-4 py-2 text-primaryBg hover:bg-primaryOrange-dark focus:bg-primaryOrange-dark  hover:text-white focus:text-white"
        >
          Support
        </NavLink>
        <NavLink
          to="/register"
          className="block px-4 py-2 text-primaryBg hover:bg-primaryOrange-dark focus:bg-primaryOrange-dark  hover:text-white focus:text-white"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="block px-4 py-2 text-primaryBg hover:bg-primaryOrange-dark focus:bg-primaryOrange-dark hover:text-white focus:text-white"
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
