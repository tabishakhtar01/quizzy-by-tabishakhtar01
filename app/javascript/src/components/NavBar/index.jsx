import React from "react";
import { Link } from "react-router-dom";
import authApi from "../../apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserFirstName");
  const userId = getFromLocalStorage("authId");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        email: null,
        userId: null,
        userFirstName: null,
      });
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="font-sans text-3xl font-semibold">
            <Link className="cursor-pointer" to="/">
              Polly
            </Link>
          </h1>
          <div className="flex items-center justify-end gap-x-4">
            <span
              className="inline-flex items-center px-2 pt-1 text-md font-regular leading-5 text-bb-gray-600
                  text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
                  focus:text-bb-gray-700"
            >
              {userName}
            </span>
            <a
              onClick={handleLogout}
              className="inline-flex items-center px-1 pt-1 text-md
                  font-semibold leading-5 text-bb-gray-600 text-opacity-50
                  transition duration-150 ease-in-out border-b-2
                  border-transparent hover:text-bb-gray-600 focus:outline-none
                  focus:text-bb-gray-700 cursor-pointer"
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
