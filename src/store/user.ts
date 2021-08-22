import WebSocket from 'ws';

type UserSchema = { connection: WebSocket };

type UserList = Record<string, UserSchema>;

class UserModel {
  private users: UserList = {};

  public add(userName: string, schema: UserSchema): void {
    this.users[userName] = schema;
  }

  public remove(userName: string): void {
    delete this.users[userName];
  }

  public get(userName: string) {
    return this.users[userName];
  }

  public getAll() {
    return this.users;
  }
}

export const User = new UserModel();
