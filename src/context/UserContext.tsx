import * as React from 'react';

interface IUser {
  id: string;
  email: string;
  createdAt: Date;
}

interface IUserProviderProps {
  user: IUser | null;
  children: React.ReactNode;
}

export const UserContext = React.createContext<{ user: IUser | null }>({ user: null });

export const UserProvider = ({ user, children }: IUserProviderProps) => {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
