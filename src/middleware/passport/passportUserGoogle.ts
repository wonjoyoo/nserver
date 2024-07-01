/*
import passportGoogle, {
  Profile,
  VerifyCallback,
  StrategyOptions,
} from 'passport-google-oauth20';
import logger from '../../libs/logger';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';

export const userGoogleStrategy = passportGoogle.Strategy;

export const userGoogleStrategyOption: StrategyOptions = {
  clientID: String(process.env.USER_GOOGLE_CLIENT_ID),
  clientSecret: String(process.env.USER_GOOGLE_CLIENT_PASSWORD),
  callbackURL: process.env.USER_GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email'],
};

export const userGoogleVerify = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
  const userRepo = getCustomRepository(UserRepository);
  const user = await userRepo.findByEmail(profile.emails![0].value);
  if (user) {
    done(undefined, profile);
  } else {
    await userRepo.googleRegister(profile);
    done(undefined, profile);
  }
};
*/
