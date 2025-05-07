import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, toggleUserStatus } from '../../actions/adminActions';
import PropTypes from 'prop-types';

const AdminDashboard = ({ 
    auth: { user }, 
    admin: { users, loading }, 
    getAllUsers, 
    toggleUserStatus 
}) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }
        getAllUsers();
    }, [getAllUsers, user, navigate]);

    const handleToggleStatus = async (userId) => {
        try {
            await toggleUserStatus(userId);
            setError(null);
        } catch (err) {
            setError('Failed to update user status. Please try again.');
        }
    };

    if (!user || !user.isAdmin) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="container">
            <h1 className="display-4">Admin Dashboard</h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
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
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                        {user.isActive ? 'Active' : 'Disabled'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className={`btn btn-sm ${user.isActive ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => handleToggleStatus(user._id)}
                                                    >
                                                        {user.isActive ? 'Disable' : 'Enable'}
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

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    toggleUserStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

export default connect(mapStateToProps, { getAllUsers, toggleUserStatus })(AdminDashboard); 