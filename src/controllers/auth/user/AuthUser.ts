import { UserType, UserStatus } from '../../../types/enum';

export interface AuthUserRegister {
  userid: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmpassword: string;
}

export interface AuthUserAddRegisterData {
  name?: string;
  email: string;
  phone: string;
}

export interface AuthUserLogin {
  userid: string;
  password: string;
}

export interface AuthUserResponse {
  id: number;
  userid: string;
  email: string;
  phone: string;
  name: string;
  userType: UserType;
  status: UserStatus;
  phoneVerified: number;
  emailVerified: number;
  accessToken: string;
}

export interface AuthUserToken {
  user: {
    id: number;
    email: string;
    createdAt: string;
  }
}
