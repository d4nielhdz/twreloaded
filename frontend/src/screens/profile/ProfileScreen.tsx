import React, { useContext, useEffect, useState } from 'react'
import CreateTweet from '../../components/CreateTweet'
import Tweet from '../../components/Tweet'
import { AppContext } from '../../context/AppContext';
import {RiPencilFill} from 'react-icons/ri';
import { auth } from '../../firebase-config';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../services/auth-service';
import { User } from '../../models/user';
import { TweetModel } from '../../models/tweet';
import { getTweetsFromUser } from '../../services/tweets-service';
import { toggleFollowUser } from '../../services/users-service';

const ProfileScreen = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const isOwner = id == auth.currentUser?.uid ?? false;

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User>();
  const [tweets, setTweets] = useState<TweetModel[]>([]);

  const [following, setFollowing] = useState(false);
  const followers = 100;
  const num_tweets = 200;

  const gotoEditProfile = () => navigate('edit');

  const toggleFollow = async () => {
    if (!profile) return;
    await toggleFollowUser(profile);
    setFollowing(!following); 
  };

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

  useEffect(() => {
    if (profile) {
      const getTweets = async () => {
        const data = await getTweetsFromUser(profile) as TweetModel[];
        setTweets(data);
      }
      getTweets().catch(console.error);
      setLoading(false);
    }
  }, [profile]);

  const onTweetCreated = (tweet: TweetModel) => {
    let updatedTweets = [...tweets];
    updatedTweets.push(tweet);
    setTweets(updatedTweets);
  }

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
          <CreateTweet onTweetCreated={(tweet:TweetModel) => onTweetCreated(tweet)} />
        </div>
      }
      <div>
        {
          loading
            ? <div className="lds-ring blue"><div></div><div></div><div></div><div></div></div>
            : tweets.map((tweet, i) => <Tweet tweet={tweet} key={i} />)
        }
      </div>
    </div>
  )
}

export default ProfileScreen