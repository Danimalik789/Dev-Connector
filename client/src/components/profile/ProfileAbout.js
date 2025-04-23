import React from 'react'
import isEmpty from '../../validation/is-empty';

const ProfileAbout = ({ profile }) => {
  if (!profile || !profile.user || !profile.user.name) {
    return null; // Or return <Spinner />
  }
  const firstName = profile.user.name.trim().split(' ')[0] || "User";

//  Normalize profile.skills to always be an array
const skills = Array.isArray(profile.skills)
  ? profile.skills
  : profile.skills.split(' ').map(skill => skill.trim());

// Render the skills with a checkmark icon
const skillItems = skills.map((skill, index) => (
  <div key={index} className="p-3">
    <i className="fa fa-check" /> {skill}
  </div>
));



  return (
    <div className='row'>
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have bio</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">{skillItems}</div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default ProfileAbout;  
