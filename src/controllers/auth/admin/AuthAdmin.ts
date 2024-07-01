import { AdminType } from '../../../types/enum';

export interface AuthAdminLogin {
  email: string;
  password: string;
}

export interface AuthAdminRegister {
  email: string;
  phone: string;
  name: string;
  password: string;
  adminType: AdminType;
}

export interface AuthAdminResponse {
  id: number;
  email: string;
  phone: string;
  name: string;
  password: string;
  adminType: AdminType;
  accessToken: string;
}

export interface AuthAdminToken {
  admin: {
    id: number;
    email: string;
    createdAt: string;
  }
}

