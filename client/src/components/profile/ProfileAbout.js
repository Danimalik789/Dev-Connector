import React from 'react'
import isEmpty from '../../validation/is-empty';

const ProfileAbout = ({ profile }) => {
  const firstName = profile.user.name.trim().split(' ')[0] || "User";

  const skills = Array.isArray(profile.skills)
  ? profile.skills
  : profile.skills.split(' ').map(skill => skill.trim());


  return (
    <div className='row'>
      <div className="col-md-12s">
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
            <div className="d-flex flex-wrap justify-content-center align-items-center">{skills}</div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default ProfileAbout;  
