import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

import { getProfileByHandle } from "../../actions/profileActions";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGitHub from "./ProfileGitHub";
import ProfileCredentials from "./ProfileCredentials";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handle } = useParams();

  const profile = useSelector((state) => state.profile);
  const { loading, profile: profileData } = profile;

  let profileContent;

  useEffect(() => {
    if (handle) {
      dispatch(getProfileByHandle(handle));
    }
  }, [dispatch, handle]);

  if (loading) {
    profileContent = <Spinner />;
  } else if (!profileData) {
    profileContent = (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-danger">
              Profile not found. The user may not exist or the profile handle may be incorrect.
            </div>
            <Link to="/profiles" className="btn btn-light mb-3">
              Back To Profiles
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profileData} />
        <ProfileAbout profile={profileData} />
        <ProfileCredentials
          education={profileData.education}
          experience={profileData.experience}
        />
        {profileData.githubusername ? (
          <ProfileGitHub username={profileData.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
