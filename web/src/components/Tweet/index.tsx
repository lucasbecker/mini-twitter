import { HeartIcon } from "@heroicons/react/outline";

interface TweetProps {
  name: string;
  username: string;
  avatar: string;
  children: React.ReactNode;
}

export default function Tweet({ name, username, avatar, children }: TweetProps) {
  return (
    <div className="flex space-x-4 p-4 border-t border-silver">
      <div>
        <img src={avatar} />
      </div>
      <div className='space-y-1'>
        <div className="space-x-1 text-sm">
          <span className="font-bold">{name}</span>
          <span className="text-silver">@{username}</span>
        </div>

        <p>{children}</p>

        <div className='flex items-center space-x-1 text-silver text-sm'>
          <HeartIcon className='w-5 stroke-1' />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}
