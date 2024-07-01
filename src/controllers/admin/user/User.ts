import { LoginProvider, UserStatus, UserType, Gender } from '../../../types/enum'

export interface UsersResponse {
  id: number
  userid: string
  email: string
  phone: string
  name: string
  userType: UserType
  status: UserStatus
  gender: Gender
  avatar: string
  birthday: string
}

export interface UserResponse {
  id: number
  userid: string
  email: string
  phone: string
  name: string
  userType: UserType
  status: UserStatus
  gender: Gender
  avatar: string
  birthday: string
  createdAt: string
  
}

export interface UserRegister {
  userid: string
  password: string
  email: string
  phone: string
  name: string
  userType: UserType
  status: UserStatus
  gender: Gender
  avatar: string
 
}

export interface UserPatch {
  userid?: string
  password?: string
  email?: string
  phone?: string
  name?: string
  userType?: UserType
  status?: UserStatus
  gender?: Gender
  avatar?: string
  accessToken?: string
 
}

export interface UserChangeStatus {
  status: UserStatus
}


export interface KakaoUserRegister {
  userid: string
  email: string
  phone: string
  name: string
  userType: UserType
  gender: Gender
  //avatar: string
  accessToken: string
  
}
