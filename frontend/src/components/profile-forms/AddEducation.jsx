import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData)).then(() => navigate('/dashboard'));
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h1 className="form-title">Add Your Education</h1>
      <p className="form-subtitle">Add any school or bootcamp that you have attended</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} required />
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
            Current Study
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
        </div>
        <div className="form-group">
          <textarea name="description" cols="30" rows="5" placeholder="Program Description" value={description} onChange={onChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddEducation;