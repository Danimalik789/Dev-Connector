import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, toggleUserStatus } from "../../actions/adminActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get state from redux store
  const user = useSelector((state) => state.auth.user);
  const { users, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //Access Check
  if (!user || !user.isAdmin) {
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return (
      <div className="container">
        <h4>Access Denied. Admin privileges required.</h4>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  const handleToggleStatus = (userId) => {
    dispatch(toggleUserStatus(userId));
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      setSelectAll(false);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      if (selectedUsers.length + 1 === users.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id));
      setSelectAll(true);
    } else {
      setSelectedUsers([]);
      setSelectAll(false);
    }
  };

  const handleEnableSelected = () => {
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u._id === userId);
      if (user && !user.isActive) {
        dispatch(toggleUserStatus(userId));
      }
    });
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const handleDisableSelected = () => {
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u._id === userId);
      if (user && user.isActive) {
        dispatch(toggleUserStatus(userId));
      }
    });
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="display-4">Admin Dashboard</h1>

      {/*Search Bar */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name or email...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>User Management</h4>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleEnableSelected}
                  disabled={selectedUsers.length === 0}
                >
                  Enable Selected
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDisableSelected}
                  disabled={selectedUsers.length === 0}
                >
                  Disable Selected
                </button>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => handleSelectUser(user._id)}
                          />
                        </td>
                        <td className="fw-bold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.isActive ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {user.isActive ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              user.isActive ? "btn-danger" : "btn-success"
                            }`}
                            onClick={() => handleToggleStatus(user._id)}
                          >
                            {user.isActive ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
