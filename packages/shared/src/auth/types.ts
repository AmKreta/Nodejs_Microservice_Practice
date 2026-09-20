// Values must match the role CHECK constraint in sql/001_users.sql.
export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserJwtPayload {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }