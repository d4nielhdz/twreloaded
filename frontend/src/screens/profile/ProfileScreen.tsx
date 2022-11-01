import React, { useContext, useEffect, useState } from 'react'
import CreateTweet from '../../components/CreateTweet'
import Tweet from '../../components/Tweet'
import { AppContext } from '../../context/AppContext';
import {RiPencilFill} from 'react-icons/ri';
import { auth } from '../../firebase-config';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../services/auth-service';
import { User } from '../../models/user';

const ProfileScreen = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const isOwner = id == auth.currentUser?.uid ?? false;

  const [profile, setProfile] = useState<User>();

  const [following, setFollowing] = useState(false);
  const followers = 100;
  const num_tweets = 200;

  const gotoEditProfile = () => navigate('edit');

  const toggleFollow = () => setFollowing(!following);

  useEffect(() => {
    if (!isOwner) {
      const getUser = async () => {
        const data = await getUserById(id!) as User;
        setProfile(data);
      }
      getUser().catch(console.error);
    } else {
      setProfile(context.user);
    }
  }, [isOwner]);

  return (
    <div>
      <div className='mb-2'>
        <div className='flex'>
          <h1>{profile?.username}</h1>
          {
            isOwner ? <button onClick={gotoEditProfile} className='btn ml-1'><RiPencilFill /></button>
            : following ? <button onClick={toggleFollow} className='btn main-alt ml-auto'>Unfollow</button> 
              : <button onClick={toggleFollow} className='btn main ml-auto'>Follow</button>
          }
        </div>
        <div className='flex g-2  mt-1'>
          <div>
            <p><b>Tweets</b>: {num_tweets}</p>
          </div>
          <div>
            <p><b>Seguidores</b>: {followers}</p>
          </div>
        </div>
        
      </div>
      {
        isOwner && 
        <div>
          <CreateTweet />
        </div>
      }
      <div>
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  )
}

export default ProfileScreen