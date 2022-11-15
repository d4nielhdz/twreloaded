import React, { useEffect, useState } from "react";
import CreateTweet from "../../components/CreateTweet";
import Tweet from "../../components/Tweet";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/auth-service";
import { User } from "../../models/user";
import { RenderedTweet } from "../../models/tweet";
import { getTweetsFromUser } from "../../services/tweets-service";
import { toggleFollowUser } from "../../services/users-service";
import Loader from "../../components/Loader";
import useUser from "../../hooks/useUser";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { id } = useParams();
  const isOwner = id === (user?.id ?? "");

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User>();
  const [tweets, setTweets] = useState<RenderedTweet[]>([]);

  const [following, setFollowing] = useState(false);
  const followers = 100;
  const num_tweets = 200;

  const gotoEditProfile = () => navigate("edit");

  const toggleFollow = async () => {
    if (!id || isOwner) return;
    await toggleFollowUser(id);
    setFollowing(!following);
  };

  const getTweets = async () => {
    const data = (await getTweetsFromUser(id!)) as RenderedTweet[];
    setTweets(data);
    setLoading(false);
  };
  const getProfile = async () => {
    const user = await getUserById(id!);
    setProfile(user);
  };
  useEffect(() => {
    if (id) {
      getProfile().catch(console.error);
      getTweets().catch(console.error);
    }
  }, [id]);

  const onTweetCreated = (tweet: RenderedTweet) => {
    let updatedTweets = [...tweets];
    updatedTweets.push(tweet);
    setTweets(updatedTweets);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="mb-2">
        <div className="flex">
          <h1>{profile?.username}</h1>
          {isOwner ? (
            <button onClick={gotoEditProfile} className="btn ml-1">
              <RiPencilFill />
            </button>
          ) : following ? (
            <button onClick={toggleFollow} className="btn main-alt ml-auto">
              Unfollow
            </button>
          ) : (
            <button onClick={toggleFollow} className="btn main ml-auto">
              Follow
            </button>
          )}
        </div>
        <div className="flex g-2  mt-1">
          <div>
            <p>
              <b>Tweets</b>: {num_tweets}
            </p>
          </div>
          <div>
            <p>
              <b>Seguidores</b>: {followers}
            </p>
          </div>
        </div>
      </div>
      {isOwner && (
        <div>
          <CreateTweet onTweetCreated={(tweet) => onTweetCreated(tweet)} />
        </div>
      )}
      <div>
        {tweets.map((tweet, i) => (
          <Tweet tweet={tweet} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
