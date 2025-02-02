import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuCalendarCheck } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 min-w-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex  items-center">
            <span className="text-white font-bold text-xl flex flex-row ">
              <LuCalendarCheck className="text-4xl mr-2" />
              MyCalendar
            </span>
          </div>

          {/* Menu Toggle */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`lg:flex ${
              isOpen ? "block" : "hidden"
            } space-x-4 items-center`}
          >
            <a
              href="https://www.linkedin.com/in/bishworup11/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaLinkedin className="mr-2 text-4xl text-white" /> LinkedIn
            </a>
            <a
              href="https://github.com/bishworup11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaGithub className="mr-2 text-4xl text-white" /> GitHub
            </a>
            <a
              href="mailto:bishworupmollik@gmail.com"
              
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <HiOutlineMail className="mr-2 text-4xl text-white " /> Email
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
