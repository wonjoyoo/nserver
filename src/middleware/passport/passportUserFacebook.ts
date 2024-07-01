// import passportFacebook, { Profile, StrategyOption, VerifyFunction } from 'passport-facebook';
// import logger from '../../libs/logger';
// import { getCustomRepository } from 'typeorm';
// import UserRepository from '../../repositories/UserRepository';
//
// export const userFacebookStrategy = passportFacebook.Strategy;
//
// export const userFacebookStrategyOption:StrategyOption={
//   clientID:String(process.env.USER_FACEBOOK_CLIENT_ID),
//   clientSecret: String(process.env.USER_FACEBOOK_CLIENT_PASSWORD),
//   callbackURL: 'http://localhost:3000/api/auth/facebook/user/callback',
// }
//
// export const userFacebookVerify: VerifyFunction = async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {
//   try {
//     const userRepo = getCustomRepository(UserRepository);
//     const user = await userRepo.findByEmail(profile.emails![0].value);
//     if (!user) {
//       const user = await userRepo.facebookRegister(profile);
//       return done(null, user);
//     } else {
//       return done(null, user);
//     }
//   } catch (e) {
//     logger.error(e.message);
//     done(e);
//   }
// };
