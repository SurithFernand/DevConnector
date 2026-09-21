import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../redux/slices/profileSlice';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  if (loading) return <p>Loading developer profiles...</p>;

  return (
    <div>
      <h1 className="form-title">Developers</h1>
      <p className="form-subtitle">Browse and connect with developers</p>

      <div>
        {profiles.length > 0 ? (
          profiles.map((prof) => (
            <div key={prof._id} className="profile-card">
              <img
                src={prof.user?.avatar || 'https://via.placeholder.com/150'}
                alt={prof.user?.name}
                className="round-img"
              />
              <div>
                <h2>{prof.user?.name}</h2>
                <p>
                  {prof.status} {prof.company && <span>at {prof.company}</span>}
                </p>
                <p>{prof.location && <span>{prof.location}</span>}</p>
              </div>
              <ul className="skills-list">
                {prof.skills.slice(0, 4).map((skill, index) => (
                  <li key={index}>✓ {skill}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </div>
  );
};

export default Profiles;