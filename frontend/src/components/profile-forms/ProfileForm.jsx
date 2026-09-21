import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());
    if (!loading && profile) {
      setFormData({
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: profile.skills ? profile.skills.join(',') : '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || '',
        twitter: profile.social?.twitter || '',
        facebook: profile.social?.facebook || '',
        linkedin: profile.social?.linkedin || '',
        youtube: profile.social?.youtube || '',
        instagram: profile.social?.instagram || ''
      });
    }
  }, [loading, dispatch, profile]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData)).then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <div className="form-container" style={{ maxWidth: '700px' }}>
      <h1 className="form-title">Edit Your Profile</h1>
      <small>* = required field</small>
      <form onSubmit={onSubmit} style={{ marginTop: '1rem' }}>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={onChange} required>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={formData.company} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={formData.website} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={formData.location} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills (eg. HTML,CSS,JavaScript,PHP)" name="skills" value={formData.skills} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={formData.githubusername} onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={formData.bio} onChange={onChange}></textarea>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
            Add Social Network Links
          </button>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group"><input type="text" placeholder="Twitter URL" name="twitter" value={formData.twitter} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="Linkedin URL" name="linkedin" value={formData.linkedin} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={onChange} /></div>
          </>
        )}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;