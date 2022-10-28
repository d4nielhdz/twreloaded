import React, { useState } from 'react';
import '../styles/tweet.scss';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Tweet = ({ isReply } : { isReply? : boolean }) => {
    const navigate = useNavigate();
    const username = 'nombreUsuario123';
    const tweetId = 1;
    const tweet = 'Lorem ipsum dolor sit amet, consectetur adip elit';
    const replies = 10;
    const likes = 20;
    const [like, setLike] = useState(false);

    const seeProfile = (e: any) => {
        e.stopPropagation()
        navigate(`/profile/${username}`)
    };
    
    const seeTweet = () => navigate(`/tweet/${tweetId}`);

    const getLikesButtonContent = () => {
        if (like) {
            return <><AiFillHeart className='red' /> {likes + 1}</>
        } else {
            return <><AiOutlineHeart /> {likes}</>
        }
    }

    return (
        <div className={`tweet ${isReply ? 'reply' : ''}`} onClick={seeTweet}>
            <div className='tweet-user'>
                <button className='bold btn link' onClick={seeProfile}>{username}</button>
            </div>
            <div className='tweet-content'>
                {tweet}
            </div>
            <div className='tweet-actions'>
                <div className='reply'>
                    <button className='btn'><MdOutlineChatBubbleOutline /> {replies}</button>
                </div>
                <div className='like'>
                    <button onClick={() => setLike(!like)} className='btn'>
                        {getLikesButtonContent()}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tweet