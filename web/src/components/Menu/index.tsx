import { HomeIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth";

export default function Menu() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  function logout() {
    logOut(() => navigate("/"));
  }

  return (
    <div className="h-[100vh] max-h-[100vh] flex flex-col justify-between items-stretch p-8 sticky top-0 left-0 ">
      <div className="w-[275px] flex flex-col items-start space-y-4">
        <Link to="/home" className="w-full flex items-center justify-start space-x-4 text-left py-2 px-4 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20">
          <HomeIcon width={32} />
          <span className="text-left text-lg font-bold">Página Inicial</span>
        </Link>
        <Link to={user?.username || ""} className="w-full flex items-center justify-start space-x-4 text-left py-2 px-4 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20">
          <UserIcon width={32} />
          <span className="text-left text-lg font-bold">Perfil</span>
        </Link>
      </div>
      <div className="w-[275px] flex flex-col items-start space-y-4">
        <button onClick={logout} className="w-full flex items-center justify-start space-x-4 text-left py-2 px-4 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20">
          <LogoutIcon width={32} />
          <span className="text-left text-lg font-bold">Sair</span>
        </button>
      </div>
      {/* <div className="flex items-center justify-between space-x-4 p-2 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20">
        <img src={'src/assets/images/avatar.svg'} />
        <div className="flex flex-col flex-1">
          <span className="font-bold text-md">{user?.name}</span>
          <span className="text-sm">@{user?.username}</span>
        </div>
        <button
          onClick={logout}
          title="Sair"
          className="p-4 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20"
        >
          <LogoutIcon width={18} />
        </button>
      </div> */}
    </div>
  )
}