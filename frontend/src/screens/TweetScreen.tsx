import React from 'react'
import Tweet from '../components/Tweet'

const TweetScreen = () => {
  return (
    <div>
      <Tweet />

      <div>
        <Tweet isReply={true} />
        <Tweet isReply={true} />
      </div>
    </div>
  )
}

export default TweetScreen