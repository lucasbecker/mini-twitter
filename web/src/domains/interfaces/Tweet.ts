import User from "./User";

export default interface ITweet {
  id: string,
  userId: string,
  text: string,
  user: User,
}
