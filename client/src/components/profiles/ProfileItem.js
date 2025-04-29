import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
  const { status, company, location,  skills, handle, } = profile;

    // Ensure skills is an array
    const skillsA = Array.isArray(skills) ? skills : typeof skills === 'string'? skills.split(',').map(skill => skill.trim()) : [];



  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img src={profile.user?.avatar} alt="" className="rounded-circle" />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.handle}</h3>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${handle}`} className="btn btn-outline-dark">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {skillsA && skillsA.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
