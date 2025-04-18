import React, { useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Spinner  from '../common/Spinner'
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions'

const Profiles = () => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile)
    const {profiles, loading} = profile;

    useEffect(() => {
        dispatch(getProfiles())
    },[dispatch])

let profileItems;

if(profiles === null || loading){
    profileItems = <Spinner />
} else{
    if (profiles.length > 0 ) {
        profileItems = profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
        ));
    } else{
        profileItems = <h4>No Profiles Found</h4>
    }
}


  return (
    <div className='profiles'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">
                        Browse and connect with developers
                    </p>
                    {profileItems}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Profiles;

