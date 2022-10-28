import React from 'react'
import CreateTweet from '../components/CreateTweet'
import Tweet from '../components/Tweet'

const HomeScreen = () => {
  return (
    <div>
      <div>
        <CreateTweet />
      </div>
      <div>
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  )
}

export default HomeScreen