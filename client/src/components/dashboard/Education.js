import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { deleteEducation } from "../../actions/profileActions";


const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector(
    (state) => state.profile.profile?.education || []
  );

 const onDeleteClick = (id) => {
    dispatch(deleteEducation(id))
 }

  return (
    <>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
          {education.map((education) => (
            <tr key={education._id}>
              <td>{education.school}</td>
              <td>{education.degree}</td>
              <td>{moment(education.from).format("YYYY/MM/DD")} - {education.to ? moment(education.to).format("YYYY/MM/DD"): " Till Now"}</td>
              <td>
                <button onClick={()=> onDeleteClick(education._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Education;
