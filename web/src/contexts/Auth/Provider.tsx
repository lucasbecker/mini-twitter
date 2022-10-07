import { useEffect, useState } from "react";
import AuthContext from ".";
import AuthService from "../../services/Auth";
import User from "../../domains/interfaces/User";
import LogIn from "../../domains/interfaces/LogIn";
import SignUp from "../../domains/interfaces/SignUp";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function setToken(token: string) {
    localStorage.setItem('@mini-twitter:token', token);
  }

  async function signUp(signUp: SignUp, callback: VoidFunction) {
    try {
      setLoading(true);
      const data = await AuthService.signUp(signUp);
  
      if (data) {
        setUser(data);
        setToken(data.accessToken);
        callback();
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logIn(logIn: LogIn, callback: VoidFunction) {
    try {
      setLoading(true);
      const data = await AuthService.logIn(logIn);

      if (data) {
        setUser(data);
        setToken(data.accessToken);
        callback();
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function logOut(callback: VoidFunction) {
    setUser(null);
    localStorage.removeItem('@mini-twitter:token');
    callback();
  }

  async function authenticate() {
    try {
      setLoading(true);

      const token = localStorage.getItem("@mini-twitter:token");

      if (token) {
        const data = await AuthService.authenticate(token);
        
        if (data) {
          setUser(data);
          setToken(data.accessToken);
        }
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}