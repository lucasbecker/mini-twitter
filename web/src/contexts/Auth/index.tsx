import { createContext } from "react";
import LogIn from "../../domains/interfaces/LogIn";
import SignUp from "../../domains/interfaces/SignUp";
import User from "../../domains/interfaces/User";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (signUp: SignUp, callback: VoidFunction) => Promise<void>;
  logIn: (logIn: LogIn, callback: VoidFunction) => Promise<void>;
  logOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;