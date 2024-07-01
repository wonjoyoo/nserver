export enum AdminType {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  ADS_VIEWER = 'ads_viewer',
  STORE_VIEWER = 'store_viewer',
}

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  BRANCH = 'branch',
  OWNER = 'owner',
  BO = 'bo',
}

export enum UserStatus {
  ACTIVE = 'active',
  QUIT = 'quit',
  HOLD = 'hold',
}

export enum EmailType {
  SIGN_UP = 'SIGN_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum LoginProvider {
  EMAIL = 'email',
  KAKAO = 'kakao',
  APPLE = 'apple'
}
export enum ExchangeStatus {
  REQUEST = 'request',
  APPROVED = 'approved'
}
export enum Site {
  WWW = 'WWW',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}


export enum Status {
  APPLYING = 'applying',
  FAIL = 'fail',
  SUBMIT = 'submit'
}

export enum AgeGroup {
  AGE10 = '10',
  AGE20 = '20',
  AGE30 = '30',
  AGE40 = '40',
  AGE50 = '50',
  AGE60 = '60',
  AGE70 = '70'
}
