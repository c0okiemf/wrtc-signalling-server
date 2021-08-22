import WebSocket from 'ws';

type AdminSchema = { userName: string; password: string; connection: WebSocket | undefined };

class AdminModel {
  private admin: AdminSchema = {
    userName: 'admin',
    password: 'admin',
    connection: undefined,
  };

  public get(): Omit<AdminSchema, 'password'> {
    const adminToRetrieve = {
      ...this.admin,
      password: undefined,
    };
    return adminToRetrieve;
  }

  public authorize(password?: string): boolean {
    return password === this.admin.password;
  }

  public setConnection(connection: WebSocket): void {
    this.admin.connection = connection;
  }
}

export const Admin = new AdminModel();
