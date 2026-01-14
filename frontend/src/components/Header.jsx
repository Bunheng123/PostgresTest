import React from "react";

const Header = ({ onAddUserClick }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-bla ">Dashboard</h1>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search users..."
          className="border-3 border-gray-900 rounded-[5px] px-4 py-2 text-gray-400"
        />
        <button
          onClick={onAddUserClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          + Add User
        </button>
      </div>
    </div>
  );
};

export default Header;
