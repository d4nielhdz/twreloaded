import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { TweetModel } from '../models/tweet';
import { postTweet } from '../services/tweets-service';
import '../styles/tweet.scss';

const CreateTweet = ({ onTweetCreated } : { onTweetCreated : (tweet: TweetModel) => void}) => {
    const context = useContext(AppContext);
    const [tweetContent, setTweetContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTweet : TweetModel = await postTweet({
            id: '',
            user: {
                id: context.user!.id,
                email: context.user!.email,
                username: context.user!.username
            },
            content: tweetContent,
            replyTo: null
        });
        onTweetCreated(newTweet);
        setTweetContent('');
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <textarea 
            value={tweetContent} 
            onChange={(e) => setTweetContent(e.target.value)} 
            placeholder='¿Qué está pasando?' 
            className='input-field w-100'
            />
            <div className='action'>
                <input type="submit" value="Tweetear" className='btn main' />
            </div>
            
        </form>
    )
}

export default CreateTweet