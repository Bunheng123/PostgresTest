import React from "react";

const UserList = ({ users, loading, error, handleDelete, handleEdit }) => {
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-12 mt-37.5">
        <div className="w-32 h-32 border-16 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-white text-4xl mt-4">Loading...</p>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="text-white px-4 py-3 text-left border-b border-gray-700">
              #
            </th>
            <th className="text-white px-4 py-3 text-left border-b border-gray-700">
              Name
            </th>
            <th className="text-white px-4 py-3 text-left border-b border-gray-700">
              Email
            </th>
            <th className="text-white px-4 py-3 text-left border-b border-gray-700">
              Password
            </th>
            <th className="text-white px-4 py-3 text-center border-b border-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="hover:bg-gray-900 border-b border-gray-800"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.password}</td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black font-medium transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-medium transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
