export default class Tweet {
  constructor(
    public id: string,
    public text: string,
    public name: string,
    public username: string,
  ) {}

  static make(data: any) {
    return new Tweet(
      data.id,
      data.text,
      data.user.name,
      data.user.username,
    );
  }
}