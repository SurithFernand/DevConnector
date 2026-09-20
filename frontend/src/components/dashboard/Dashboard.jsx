import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/slices/profileSlice';
import { logout } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    dispatch(logout());
  };

  if (loading && profile === null) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="form-title">Dashboard</h1>
      <p className="form-subtitle">Welcome {user && user.name}</p>

      {profile !== null ? (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link to="/edit-profile" className="btn btn-light">Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-light">Add Experience</Link>
            <Link to="/add-education" className="btn btn-light">Add Education</Link>
          </div>

          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div style={{ marginTop: '3rem' }}>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete My Account
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to="/create-profile" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;