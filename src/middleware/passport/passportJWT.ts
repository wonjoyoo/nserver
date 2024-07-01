import { StrategyOptions, Strategy, VerifiedCallback } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';
import { AdminRepository } from '../../repositories/AdminRepository';
import express, { Request } from 'express';
import logger from '../../libs/logger';

export const jwtStrategy = Strategy;

const headerExtractor = function(req: Request) {
  let token = null;
  //if (req && req.cookies) token = req.cookies['access_token'];
  // cookies 에서 headers 객체로 담겨져 온것에서 파싱
  if(req && req.headers) token = req.headers['access_token'];
  return token;
};

export const jwtStrategyOption: StrategyOptions = {
  // @ts-ignore
  jwtFromRequest: headerExtractor,
  secretOrKey: process.env.SECRET,
  passReqToCallback: true,
};

export const jwtVerify = (req: express.Request, payload: IPayload, done: VerifiedCallback) => {
  console.log('===================')
  console.log('jwtVerify!')
  try {
    if (payload.admin) {
      const adminRepo = getCustomRepository(AdminRepository);
      adminRepo.findByEmail(payload.admin.email)
        .then((admin) => {
          if (admin) {
            req.user = admin;
            console.log('req.user = admin')
            return done(null, admin);
          } else {
            return done(null, false);
          }
        }).catch(e => {
        logger.error(e.message);
        return done(e, false);
      });
      console.log('===================')
    } else if (payload.user) {
      console.log("passportJWT payload.user paload=" + JSON.stringify(payload));
      const userRepo = getCustomRepository(UserRepository);
      // 추후 이메일로 수정
      userRepo.findByKakaoEmail(payload.user.email)
        .then((user) => {
          if (user) {
            req.user = user;
            return done(null, user);
          } else {
            return done(null, false);
          }
        }).catch(e => {
        logger.error(e.message);
        return done(e, false);
      });
    } else {
      console.log(payload);
      return done(null, false);
    }
  } catch (e) {
    return done(e);
  }
};

interface IPayload {
  admin?: {
    id: number;
    email: string;
  };
  user?: {
    id: number;
    email: string;
    avatar: string;
  };
  iat: number;
  exp: number;
}
