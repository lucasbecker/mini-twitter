export default class User {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public email: string,
  ) {}

  static make(data: any) {
    return new User(
      data.id,
      data.name,
      data.username,
      data.email,
    );
  }
}
