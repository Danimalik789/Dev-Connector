import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileHeader = ({ profile }) => {
  const { user, status, company, location, social = {} } = profile;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white-mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              {profile.user?.avatar && (
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name || "User"}
                ></img>
              )}
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 tex-center">{user.name}</h1>
            <p className="lead tex-center">
              {status} {isEmpty(company) ? null : <span> at {company}</span>}
            </p>
            {isEmpty(location) ? null : <p>{location}</p>}
            <p>
              {isEmpty(profile.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {isEmpty(social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {isEmpty(social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {isEmpty(social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {isEmpty(social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {isEmpty(social.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
