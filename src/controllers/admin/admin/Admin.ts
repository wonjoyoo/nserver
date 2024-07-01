import { AdminType } from '../../../types/enum'

export interface AdminsResponse {
  id: number
  email: string
  phone: string
  name: string
  adminType: AdminType
  createdAt: Date
}

export interface AdminResponse {
  id: number
  email: string
  phone: string
  name: string
  adminType: AdminType
  createdAt: Date
}

export interface AdminPwResponse {
  password: string
}

export interface AdminRegister {
  email: string
  phone: string
  name: string
  password: string
  adminType: AdminType
}

export interface AdminPatch {
  email: string
  phone: string
  name: string
  password: string
  adminType: AdminType
}

export interface AdminPatchPw {
  password: string
}

