export type IUserRole = 'admin' | 'client'

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: IUserRole;
  createdAt?: string;
  updatedAt?: string;
}
