import jwt from 'jsonwebtoken';
import express from 'express';
import passport from 'passport';

/**
 * ToDo: Token 갱신하는 로직 추가
 */

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
) {
  console.log('=============================')
  console.log('expressAuthentication')
  const res = (<any>request).res as express.Response;
  switch (securityName) {
    case 'jwt':
      return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
          if (err || !user) {
            if (info && info.name === 'TokenExpiredError') {
              res.status(401).send({ message: 'Token expired' });
            } else {
              res.status(401).send({ message: 'Unauthorized' });
            }
            return reject({ status: 401, message: 'Unauthorized' });
          }
          request.user = user;
          resolve(user);
        })(request, res);
      });
    case 'google':
      if (scopes) {
        switch (scopes[0]) {
          case 'user':
            passport.authenticate('userGoogle', function(req: express.Request, res: express.Response) {
            })(request, res);
            break;
        }
      }
      break;
    case 'facebook':
      if (scopes) {
        switch (scopes[0]) {
          case 'user':
            passport.authenticate('userFacebook', {
              scope: ['email'],
            }, function(req: express.Request, res: express.Response) {
            })(request, res);
            break;
        }
      }
      break;
    case 'apple':
      if (scopes) {
        switch (scopes[0]) {
          case 'user':
            console.log('apple 시작');
            passport.authenticate('userApple', function(req: express.Request, res: express.Response, next: express.NextFunction) {
              console.log('애플 시작');
            })(request, res, request.next);
            break;
        }
      }
  }
}
