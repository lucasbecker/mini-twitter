import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, } from "@heroicons/react/outline";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function goBack() {
    navigate(-1);
  }

  return (
    <header className="flex justify-start items-center space-x-3 p-4 border-b border-silver sticky top-0 bg-backgroundColor">
      {pathname !== "/home" && (
        <button
          onClick={goBack}
          className="p-2 rounded-full transition-colors hover:bg-silver hover:bg-opacity-20"
        >
          <ArrowLeftIcon width={18} />
        </button>
      )}

      <h1 className="font-bold text-xl">
        {title}
      </h1>
    </header>
  )
}