import passport from 'passport';
import { jwtStrategy, jwtStrategyOption, jwtVerify } from './passportJWT';

const passportConfig = ():void => {
  console.log('passportConfig!!')
  passport.use(new jwtStrategy(jwtStrategyOption, jwtVerify));
};

export default passportConfig;
