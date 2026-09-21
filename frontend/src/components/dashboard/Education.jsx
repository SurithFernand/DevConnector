import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/slices/profileSlice';

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        {new Date(edu.from).toLocaleDateString()} -{' '}
        {edu.to ? new Date(edu.to).toLocaleDateString() : 'Now'}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Education Credentials</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

export default Education;