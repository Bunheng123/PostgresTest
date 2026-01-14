import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 flex flex-col">
      <div className="text-2xl font-bold p-6 border-b-3 border-gray-800 text-white">
        User Managemer
      </div>
      <nav className="flex-1 p-4 text-white">
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded text-white font-bold bg-blue-600 hover:font-bold"
            >
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t-3 border-gray-800">
        <button className="w-full py-2 px-4 bg-blue-800 text-white rounded hover:bg-red-700 hover:font-bold">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
