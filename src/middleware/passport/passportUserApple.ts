import passportApple, {
  AuthenticateOptions,
  DecodedIdToken,
  Profile,
  VerifyCallback,
  VerifyFunction,
} from 'passport-apple';
import logger from '../../libs/logger';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';

export const userAppleStrategy = passportApple;

export const userAppleStrategyOption: AuthenticateOptions = {
  clientID: String(process.env.USER_APPLE_AUD),
  keyID: String(process.env.USER_APPLE_KEY_ID),
  teamID: String(process.env.USER_APPLE_TEAM_ID),
  callbackURL: 'http://localhost:3000/api/auth/apple/user/login',
};

export const userAppleVerify: VerifyFunction = async (accessToken: string,
                                                      refreshToken: string,
                                                      decodedIdToken: DecodedIdToken,
                                                      profile: Profile,
                                                      verified: VerifyCallback) => {
  try {
    const userRepo = getCustomRepository(UserRepository);
    console.log(profile);
  } catch (e:any) {
    logger.error(e.message);
    verified(e);
  }
};
