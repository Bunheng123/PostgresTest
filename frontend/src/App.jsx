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

  // ✅ Use environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // FETCH USERS
  const fetchUsers = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetchUsers error:", err);
        setError("Failed to load users: " + err.message);
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
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        fetchUsers();
        setAddUserModalOpen(false);
      })
      .catch((err) => {
        console.error("add user error:", err);
        setError("Failed to add user: " + err.message);
      });
  };

  // DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("delete user error:", err);
      setError("Failed to delete user: " + err.message);
    }
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
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        fetchUsers();
        setEditUserModalOpen(false);
        setSelectedUser(null);
      })
      .catch((err) => {
        console.error("update user error:", err);
        setError("Failed to update user: " + err.message);
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
