import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { deleteExperience } from "../../actions/profileActions";


const Experience = () => {
  const dispatch = useDispatch();
  const experience = useSelector(
    (state) => state.profile.profile?.experience || []
  );

 const onDeleteClick = (id) => {
    dispatch(deleteExperience(id))
 }

  return (
    <>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
          {experience.map((experience) => (
            <tr key={experience._id}>
              <td>{experience.company}</td>
              <td>{experience.title}</td>
              <td>{moment(experience.from).format("YYYY/MM/DD")} - {experience.to ? moment(experience.to).format("YYYY/MM/DD"): " Till Now"}</td>
              <td>
                <button onClick={()=> onDeleteClick(experience._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Experience;
