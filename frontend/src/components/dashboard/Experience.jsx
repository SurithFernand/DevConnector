import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../redux/slices/profileSlice';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        {new Date(exp.from).toLocaleDateString()} -{' '}
        {exp.to ? new Date(exp.to).toLocaleDateString() : 'Now'}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Experience Credentials</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

export default Experience;