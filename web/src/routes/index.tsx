import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page from "../components/Page";
import RequireAuth from "../contexts/Auth/Require";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

export default function SwitchRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Page />
            </RequireAuth>
          }
        >
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path='/:username' element={<Profile />} />
          <Route path='*' element={<Navigate to="/home" />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}