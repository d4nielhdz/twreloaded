import React, { useState } from 'react';
import { RiUserFollowLine, RiUserUnfollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';

const UserItem = ({ user } : { user : User }) => {
  const navigate = useNavigate();

  const [following, setFollowing] = useState(false);
  
  const seeProfile = (e: any) => {
    e.stopPropagation()
    navigate(`/profile/${user.id}`)
};

const toggleFollow = () => setFollowing(!following);


  return (
    <div className='tweet'>
        <button onClick={seeProfile} className='bold btn link' >{user.username}</button>
        <button onClick={toggleFollow} className='btn ml-1'>
          { following ? <RiUserUnfollowFill /> : <RiUserFollowLine /> }
        </button>
    </div>
  )
}

export default UserItem