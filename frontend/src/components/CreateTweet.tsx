import React, { useState } from 'react'
import '../styles/tweet.scss';

const CreateTweet = () => {
    const [tweet, setTweet] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        alert(tweet);
        e.preventDefault();
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <textarea 
            value={tweet} 
            onChange={(e) => setTweet(e.target.value)} 
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