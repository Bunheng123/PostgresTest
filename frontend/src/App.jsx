import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import UserList from "./components/UserList";
import AddUserModal from "./components/AddUserModal";
import EditUserModal from "./components/EditUserModal";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const API_URL = "http://localhost/MyWebsite/database/backend/crud/index.php";

  // FETCH USERS
  const fetchUsers = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ADD USER
  const handleAddUser = (user) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      fetchUsers();
      setAddUserModalOpen(false);
    });
  };

  // DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // OPEN EDIT
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };

  // UPDATE USER
  const handleUpdateUser = (user) => {
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      fetchUsers();
      setEditUserModalOpen(false);
      setSelectedUser(null);
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-800 overflow-auto">
        <Header onAddUserClick={() => setAddUserModalOpen(true)} />

        <UserList
          users={users}
          loading={loading}
          error={error}
          handleDelete={handleDelete}
          handleEdit={handleEditClick}
        />
      </div>

      {isAddUserModalOpen && (
        <AddUserModal
          onClose={() => setAddUserModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}

      {isEditUserModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setEditUserModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default App;
