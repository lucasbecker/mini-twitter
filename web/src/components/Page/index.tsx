import { Outlet } from "react-router-dom";
import Menu from "../Menu";
import SideBar from "../SideBar";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-full w-full flex justify-center">
        <Menu />
        <Outlet />
        <SideBar />
      </div>
    </div>
  )
}