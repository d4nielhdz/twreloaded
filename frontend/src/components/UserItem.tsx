import React, { useState } from 'react';
import { RiUserFollowLine, RiUserUnfollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const UserItem = () => {
  const navigate = useNavigate();
  const username = 'nombreUsuario123';

  const [following, setFollowing] = useState(false);
  
  const seeProfile = (e: any) => {
    e.stopPropagation()
    navigate(`/profile/${username}`)
};

const toggleFollow = () => setFollowing(!following);


  return (
    <div className='tweet'>
        <button onClick={seeProfile} className='bold btn link' >{username}</button>
        <button onClick={toggleFollow} className='btn ml-1'>
          { following ? <RiUserUnfollowFill /> : <RiUserFollowLine /> }
        </button>
    </div>
  )
}

export default UserItem