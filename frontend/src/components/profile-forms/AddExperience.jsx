import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData)).then(() => navigate('/dashboard'));
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h1 className="form-title">Add An Experience</h1>
      <p className="form-subtitle">Add any developer/programming positions you have held</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} required />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
        </div>
        <div className="form-group">
          <textarea name="description" cols="30" rows="5" placeholder="Job Description" value={description} onChange={onChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddExperience;