import React, { useState } from 'react';
import '../styles/tweet.scss';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaReplyAll } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TweetModel } from '../models/tweet';

const Tweet = ({ tweet } : { tweet : TweetModel }) => {
    const navigate = useNavigate();

    const replies = 10;
    const likes = 20;
    const [like, setLike] = useState(false);

    const seeProfile = (e: any) => {
        e.stopPropagation();
        navigate(`/profile/${tweet.user.id}`);
    };
    
    const seeTweet = () => navigate(`/tweet/${tweet.id}`);

    const seeReply = (e: any) => {
        e.stopPropagation();
        navigate(`/tweet/${tweet.replyTo}`);
    };

    const getLikesButtonContent = () => {
        if (like) {
            return <><AiFillHeart className='red' /> {likes + 1}</>
        } else {
            return <><AiOutlineHeart /> {likes}</>
        }
    }

    return (
        <div className='tweet' onClick={seeTweet}>
            {
                tweet.replyTo &&
                <button className='btn link reply' onClick={seeReply}><FaReplyAll /> Respuesta</button>
            }
            <div className='tweet-user'>
                <button className='bold btn link' onClick={seeProfile}>{tweet.user.username}</button>
            </div>
            <div className='tweet-content'>
                {tweet.content}
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