import { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth';
import ITweet from '../../domains/interfaces/Tweet';
import Tweet from '../../components/Tweet';
import api from '../../services/api';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const auth = useAuth();
  const [tweets, setTweets] = useState<Array<ITweet>>([]);
  const [loading, setLoading] = useState(false);

  const { username } = useParams();

  async function getTweets() {
    setLoading(true);
    const { data } = await api.get("tweets/"+username, {
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
      <Header title={username ?? "Perfil de Usuário"} />
      <div className=''>
        {/* <div className='bg-birdBlue h-[100px]'></div> */}
        <div className='p-4 flex flex-col space-y-4'>
          <img className='w-[20%]' src={'src/assets/images/avatar.svg'} />
          <div>
            <h2 className='text-2xl font-bold'>
              {username}
            </h2>
            <span className='text-md text-silver'>
              @{username}
            </span>
          </div>
        </div>
      </div>
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
    </div>
  )
}
