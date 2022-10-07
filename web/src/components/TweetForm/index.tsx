import axios from "axios";
import { useState } from "react";
import User from "../../domains/interfaces/User";

const MAX_TWEET_SIZE = 140;

interface TweetFormProps {
  loggedUser: User,
  onSuccess: () => Promise<void>;
}

export default function TweetForm({ loggedUser, onSuccess }: TweetFormProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChangeText(event: any) {
    const { value } = event.target;
    setText(value);
  }

  async function sendTweet() {
    setLoading(true);
    await axios.post(`${import.meta.env.VITE_API_HOST}tweets`, {
      text,
    }, {
      headers: {
        authorization: `Bearer ${loggedUser.accessToken}`,
      }
    })
    setText('');
    onSuccess();
    setLoading(false);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    sendTweet();
  }

  const isTextTooLong = text.length > MAX_TWEET_SIZE;

  return (
    <div className='flex items-start space-x-4 p-4'>
      <img src={'src/assets/images/avatar.svg'} />

      <form className='flex-1 text-lg flex flex-col space-y-4' onSubmit={handleSubmit}>
        <textarea
          name='text'
          value={text}
          onChange={handleChangeText}
          className='bg-transparent'
          placeholder='O que está acontecendo?'
          disabled={loading}
        />
        <div className='flex items-center justify-end space-x-4'>
          <span className={`text-sm ${isTextTooLong ? 'text-red-500' : 'text-silver'}`}>
            {text.length}/{MAX_TWEET_SIZE}
          </span>
          
          <button
            type='submit'
            disabled={isTextTooLong || loading}
            className='bg-birdBlue py-1 px-8 rounded-full font-bold disabled:opacity-50'
          >
            {loading ? 'Enviando...' : 'Tweet'}
          </button>
        </div>
      </form>
    </div>
  )
}
