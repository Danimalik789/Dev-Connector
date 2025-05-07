import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, toggleUserStatus } from "../../actions/adminActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="container">
      <h1 className="display-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>User Management</h4>
            </div>
            <div className="card-body">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} >
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
