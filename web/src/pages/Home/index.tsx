import { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth';
import ITweet from '../../domains/interfaces/Tweet';
import TweetForm from '../../components/TweetForm';
import Tweet from '../../components/Tweet';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Array<ITweet>>([]);
  const [loading, setLoading] = useState(false);

  async function getTweets() {
    setLoading(true);
    const { data } = await api.get("tweets", {
      headers: {
        authorization: `Bearer ${auth.user?.accessToken ?? ''}`
      }
    });

    setTweets(data);
    setLoading(false);
  }

  useEffect(() => {
    if (auth.user) getTweets();
  }, [auth]);

  return (
    <div className='w-full flex flex-col border-x border-silver'>
      <Header title='Página Inicial' />
      <TweetForm loggedUser={auth.user!} onSuccess={getTweets} />
      <>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            name={tweet.user.name}
            username={tweet.user.username}
            avatar={'src/assets/images/avatar.svg'}
          >
            {tweet.text}
          </Tweet>
        ))}

        {loading && (
          <span className='block p-12 text-silver text-center'>
            Carregando...
          </span>
        )}

        {!loading && !tweets.length && (
          <span className='block p-12 text-silver text-center'>
            Nenhum tweet por aqui ainda.
          </span>
        )}
      </>
    </div>
  )
}
