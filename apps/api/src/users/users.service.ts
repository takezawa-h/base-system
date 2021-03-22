import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Takezawa',
      password: 'p@ssw0rd'
    },
    {
      userId: 2,
      username: 'Sato',
      password: '123'
    }
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}
