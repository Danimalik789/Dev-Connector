import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience"

const Dashboard = () => {
  const dispatch = useDispatch();

  const profileState = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const { profile, loading } = profileState;

    const onDeleteClick = () => {
        dispatch(deleteAccount())
    }

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    //Check if logged in user has a profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> 
          {user.name}</Link> </p>
          <ProfileActions/>
          <Experience  experience = {profile.experience}/> 


          {/*TODO: exp and edu */}
          <div style={{marginBottom: '60px'}}/>
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete my account
          </button>
        </div>
      );
    } else {
      //User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not setup a profile, Please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  //Optional Get profile state from Redux

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="display-4">Dashboard</div>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
