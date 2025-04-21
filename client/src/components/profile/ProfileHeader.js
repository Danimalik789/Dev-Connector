import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileHeader = ({ profile }) => {
  const { user, status, company, location, website, social = {} } = profile;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card- card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              {user && (
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              )}
            </div>
            <div className="text-center">
              <h1 className="display-3 text-center">{user.name}</h1>
              <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null :  (<span>at {profile.company}</span>)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
