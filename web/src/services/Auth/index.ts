import api from "../api";
import LogIn from "../../domains/interfaces/LogIn";
import SignUp from "../../domains/interfaces/SignUp";
import IUser from "../../domains/interfaces/User";

export default class AuthService {
  public static async signUp(signUp: SignUp): Promise<IUser> {
    const { data } = await api.post("signup", signUp);

    if (data) return data;
    throw new Error("Ops, algo inesperado aconteceu...");
  }

  public static async logIn(logIn: LogIn): Promise<IUser> {
    const { data } = await api.get("login", {
      auth: {
        username: logIn.email,
        password: logIn.password,
      }
    });

    if (data) return data;
    throw new Error("Ops, algo inesperado aconteceu...");
  }

  public static async authenticate(token: string): Promise<IUser> {
    const { data } = await api.get("authenticate",  {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (data) return data;
    throw new Error("Ops, algo inesperado aconteceu...");
  }
}
