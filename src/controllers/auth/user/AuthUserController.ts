import {
  Body,
  Query,
  Controller, Example,
  Get,
  Patch,
  Path,
  Post,
  Request,
  Res,
  Route,
  Security,
  SuccessResponse,
  Tags,
  TsoaResponse,
  Delete
} from 'tsoa';
import { getCustomRepository } from 'typeorm';
import express from 'express';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import passport from 'passport';

import logger from '../../../libs/logger';
import { AuthUserLogin, AuthUserRegister, AuthUserResponse } from './AuthUser';
//import { GmailService } from '../../../libs/GmailService';
import { LoginProvider } from '../../../types/enum';

import UserRepository from '../../../repositories/UserRepository';
import { request } from 'http';
import * as crypto from 'crypto';

import {
  UserPatch
} from "../../../controllers/admin/user/User";

let globalWebSocket: WebSocket | null = null;
@Route('auth/user')
@Tags('auth')
export class AuthUserController extends Controller {
  /**
   * 이메일과 패스워드를 입력받아 회원 가입
   */
  

  @SuccessResponse(201)
  @Post('register')
  public async register(
    @Body() requestBody: AuthUserRegister,
    @Res() conflictResponse: TsoaResponse<409, {message: string}>,
    @Res() serverErrorResponse: TsoaResponse<500, {message: string}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      
      const puser = await userRepo.findByPhone(requestBody.phone);

      const existingUser = await userRepo.findByUseridOrEmailOrPhone(requestBody.userid, requestBody.email, requestBody.phone);
      const { confirmpassword, ...updateRequestBody } = requestBody;

      let newUser = undefined;
      if (existingUser) {
          if (existingUser.userid === requestBody.userid) {
              this.setStatus(200);
              return { code: "409", message: "사용자 아이디가 이미 사용중입니다." };
          }
          if (existingUser.email === requestBody.email) {
              this.setStatus(200);
              return { code: "409", message: "이메일 주소가 이미 사용중입니다." };
          }
          if (existingUser.phone === requestBody.phone) {
            if(existingUser.name ==""){//전화번호로 기존이 등록된 guest가 있는 경우
              const salt = await bcrypt.genSalt(12);
              updateRequestBody.password = await bcrypt.hash(requestBody.password, salt);
              newUser = await userRepo.updateByPk(updateRequestBody, existingUser.id);
            }else{
              this.setStatus(200);
              return {code: "409", message: "전화번호로 등록된 사용자가 있습니다."};
            }
          }
      }else{    // 신규 유저 등록
        newUser = await userRepo.register(updateRequestBody);
        console.log("new User register" + JSON.stringify(newUser));
      }


      //await userLoginMethodRepo.store(newUser.id, LoginProvider.EMAIL);
      const token = userRepo.generateToken(newUser);
      
      if (!token) {
        new Error('Can not generate token');
        return;
      }

      const access_token = cookie.serialize('access_token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      //newUser.accessToken = token;
      await userRepo.updateTokenByPk(token, newUser.id);

      this.setHeader('Set-Cookie', access_token);
      //await mailFactory(newUser.email, 'userEmailCheck', { token, email: newUser.email });

        //const gmailService = new GmailService();
        
        //const redirectURL = 'https://localhost:9000/activate-account';
      
        //try {
          //gmailService.welcomeMail(requestBody.email , requestBody.userid);
          //console.log('Welcome email has been sent successfully.');
        //} catch (error) {
          //console.error('Error sending welcome email:', error);
        //}

      this.setStatus(201);
      const sendUser = await userRepo.sendAuth(newUser.id);
      return sendUser as unknown as AuthUserResponse;
    } catch (e:any) {
      logger.error(e.message);
      return serverErrorResponse(500, {message: ""});
    }
  }


  @Example<AuthUserLogin>({
    userid: 'user1',
    password: 'password',
  })
  @SuccessResponse(200)
  @Post('login')
  public async login(
    @Request() req: express.Request,
    @Body() requestBody: AuthUserLogin,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
    @Res() conflictResponse: TsoaResponse<409, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      console.log("login")
      const user = await userRepo.findByUserid(requestBody.userid);
      console.log("user by userid" + requestBody.userid )
      console.log("user=" + user)
      if (!user) {
        console.log("userid does not exist");
        unauthorizedResponse(401, { result: 'not user' });
        return;
      }

      const match = await bcrypt.compare(requestBody.password, user.password);
      console.log(requestBody.password)

      console.log(user.password)
      console.log("match=" + match)

      if (!match) {
        console.log("password is wrong")
        unauthorizedResponse(401, { result: 'not match' });
        return;
      }

      const token = await userRepo.generateToken(user);
      if (!token) {
        new Error('Can not generate token');
        return;
      }
      /*const access_token = cookie.serialize('access_token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      this.setHeader('Set-Cookie', access_token);*/
      user.accessToken = token;
      await userRepo.updateByPk(user, user.id);
      const sendUser = await userRepo.sendAuth(user.id) as unknown as AuthUserResponse;
      sendUser.accessToken = token;

      
      return sendUser;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, { result: e.message });
      return;
    }
  }

 
  @SuccessResponse(200)
  @Post('adminlogin')
  public async adminlogin(
    @Request() req: express.Request,
    @Body() requestBody: AuthUserLogin,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
    @Res() conflictResponse: TsoaResponse<409, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByUserid(requestBody.userid);
      if (!user) {
        console.log("userid does not exist");
        unauthorizedResponse(401, { result: 'not user' });
        return;
      }

      const match = await bcrypt.compare(requestBody.password, user.password);
      console.log(requestBody.password)

      console.log(user.password)
      console.log("match=" + match)

      if (!match) {
        console.log("password is wrong")
        unauthorizedResponse(401, { result: 'not match' });
        return;
      }
      if(user.userType != 'admin'){
        unauthorizedResponse(401, { result: 'not' });
        return;
      }

      const token = await userRepo.generateToken(user);
      if (!token) {
        new Error('Can not generate token');
        return;
      }
     
      user.accessToken = token;
      await userRepo.updateByPk(user, user.id);
      const sendUser = await userRepo.sendAuth(user.id) as unknown as AuthUserResponse;
      sendUser.accessToken = token;

      return sendUser;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, { result: e.message });
      return;
    }
  }

  

  @SuccessResponse(204)
  @Security('jwt')
  @Patch('{id}')
  public async update(
    @Path() id: number,
    @Request() req: express.Request,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      console.log("update====");
      const userRepo = getCustomRepository(UserRepository);
      const { confirmpassword, ...requestBody } = req.body as UserPatch;

      
      const salt = await bcrypt.genSalt(12);
      requestBody.password = await bcrypt.hash(req.body.password, salt);
//      await handleFile(req, 'user/avatar');
/*      const requestBody: UserPatch = req.body;
        if (req.file) {
        const file = req.file as Express.MulterS3.File;
        requestBody.avatar = file.location;
      }

      // @ts-ignore
      delete requestBody['file'];
*/
      //await userRepo.updateByPk(requestBody, id);
      console.log("id="  + id);
      console.log("req.body=" + JSON.stringify(requestBody));
      const ret = await userRepo.updateByPk(requestBody, id);
      console.log("ret=" + ret);
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, { d: e.message });
    }
  }

  /**
   * access_token을 통해 인증을 확인.
   */
  @SuccessResponse(200)
  @Get('check')
  public async checkAuth(
    @Request() req: express.Request,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      console.log("AuthUserController.check()");

      const res = (<any>req).res as express.Response;
      const user = await this.handleUserAuth(req, res);
      console.log("User=" + JSON.stringify(user));
      if (!user) {
        return null;
      } else {
        const userRepo = getCustomRepository(UserRepository);
        const token = await userRepo.generateKakaoToken(user);
        if (!token) {
          new Error('Can not generate token');
          return;
        }
        console.log("AuthUserController.................. userRepo.generateKakaoToken" + token);
        user.accessToken = token;
        await userRepo.updateByPk(user, user.id);

        //this.setHeader('Set-Cookie', access_token);
        const sendUser = await userRepo.sendAuth(user.id);
        return sendUser as unknown as AuthUserResponse;
      }
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, {});
    }
  }

  @SuccessResponse(204)
  @Get('logout')
  public async logout(
    @Request() req: express.Request,
    @Res() unauthorizedResponse: TsoaResponse<401, null>,
    @Res() serverErrorResponse: TsoaResponse<500, null>,
  ) {
    try {
      this.setHeader('Set-Cookie', `access_token=; Max-Age=0; Path=/; HttpOnly`);
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, null);
    }
  }

  private handleUserAuth(req: express.Request, res: express.Response): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', function (req: any, res: any) {
        console.log('handleUserAuth() req: ', req);
        console.log('res: ', res);
        resolve(res);
      })(req, res);
    });
  }

  @SuccessResponse(200)
  @Post('lost_password')
  public async lostPassword(
    @Request() req: express.Request,
    @Body() requestBody: { email: string },
    @Res() unauthorizedResponse: TsoaResponse<401, null>,
    @Res() notFoundResponse: TsoaResponse<404, null>,
    @Res() serverErrorResponse: TsoaResponse<500, null>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      
      const user = await userRepo.findByEmail(requestBody.email);
      
      if (!user) {
        notFoundResponse(404, null);
        return;
      }
      const tempPass = this.generateTemporaryPassword();

      //const gmailService = new GmailService(); 
      await userRepo.resetPassword(user, tempPass);
      try {
      //  gmailService.resetPassword(user.email , user.userid, tempPass);
        console.log('reset password');
      } catch (error) {
        console.error('Error reset password :', error);
      }
      return user as unknown as AuthUserResponse;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, null);
    }
  }

  private generateTemporaryPassword(length: number = 6): string {
    const possibleCharacters = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, possibleCharacters.length);
        password += possibleCharacters[randomIndex];
    }
    return password;
  }

  @SuccessResponse(200)
  @Post('check_temppassword')
  public async checkTempPassword(
    @Request() req: express.Request,
    @Body() requestBody: { email: string, password:string },
    @Res() unauthorizedResponse: TsoaResponse<401, null>,
    @Res() notFoundResponse: TsoaResponse<404, null>,
    @Res() serverErrorResponse: TsoaResponse<500, null>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      
      console.log("requestBody.email=" + requestBody.email);
      const user = await userRepo.findByEmail(requestBody.email);
      
      if (!user) {
        notFoundResponse(404, null);
        return;
      }
      const match = await bcrypt.compare(requestBody.password, user.password);

      if(!match){
        console.log("not match email/password" + user.email)
        notFoundResponse(404, null);
      }
      
      return user as unknown as AuthUserResponse;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, null);
    }
  }

  /**
   * 비밀번호 변경
   */
  @SuccessResponse(200)
  @Post('reset_password')
  public async resetPassword(
    @Request() req: express.Request,
    @Body() requestBody: { email: string, password: string, newPassword: string },
    @Res() unauthorizedResponse: TsoaResponse<401, null>,
    @Res() notFoundResponse: TsoaResponse<404, null>,
    @Res() serverErrorResponse: TsoaResponse<500, null>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      // @ts-ignore
      
      //다시 한번 검증(이메일/기존패스워드 검증)
      console.log("invoke");
      const user = await userRepo.findByEmail(requestBody.email);
      console.log("user=" + user.id);
      if (!user) {
        //notFoundResponse(404, null);
        return "사용자가 존재하지 않습니다.";
      }
      const match = await bcrypt.compare(requestBody.password, user.password);

      if(!match){
        console.log("not match email/password" + user.email)
        //notFoundResponse(404, null);
        return "비밀번호가 일치하지 않습니다.";

      }

      // 신규 패스워드로 변경
      console.log("user password change" + user.id);
      await userRepo.resetPassword(user, requestBody.newPassword);
      return "success";
    } catch (e:any) {
      logger.error(e.message);
      return "server error";
      //serverErrorResponse(500, null);
    }
  }



  @SuccessResponse(200)
  @Get('userlist')
  public async userlist(
    @Request() req: express.Request,
    @Query() page: number,
    @Query() limit: number,
    @Res() unauthorizedResponse: TsoaResponse<401, null>,
    @Res() notFoundResponse: TsoaResponse<404, null>,
    @Res() serverErrorResponse: TsoaResponse<500, null>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      
      const userList = await userRepo.findList(page, limit);
      
      if (!userList) {
        notFoundResponse(404, null);
        return;
      }
      return userList;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, null);
    }
  }

  @SuccessResponse(200)
//  @Security('jwt')
  @Post('delete')
  public async delete(
    @Request() req: express.Request,
    @Res() notFoundResponse: TsoaResponse<404, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
  ) {
    try {
      console.log("start delete")
      const userRepo = getCustomRepository(UserRepository);
      console.log("req" + JSON.stringify(req.body));
      const user = await userRepo.findByUserid(req.body.userid);
      console.log("user by userid" + req.body.userid )
      if (!user) {
        console.log("userid does not exist");
        this.setStatus(200);
        return {code: "409", message: "사용자가 존재하지 않습니다."};
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      console.log(req.body.password)

      console.log(user.password)
      console.log("match=" + match)

      if (!match) {
        console.log("password is wrong")
        
        this.setStatus(200);
        return {code: "409", message: "비밀번호가 잘못되었습니다."};
      }

      console.log('DELETE 성공')
      await userRepo.softDelete(user.id);
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, {});
    }
  }


  @SuccessResponse(200)
 @Security('jwt')
  @Get('getuser/{id}')
  public async getUserInfo(
    @Request() req: express.Request,
    @Path() id: string,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
    @Res() conflictResponse: TsoaResponse<409, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByUserid(id);
      if (!user) {
        console.log("userid does not exist");
        unauthorizedResponse(401, { result: 'not user' });
        return;
      }

      /* Branch관리자인경우 Branch_id도 같이 조회 */
      let branch_id = 0;
      if(user.userType === 'branch' || user.userType === 'bo'){
        const branchRepo = getCustomRepository(BranchRepository);
        branch_id = await branchRepo.getBranchIdByOwner(user.userid)
      }
      user.password = "";
      const userWithBranchId = {
        ...user,
        branch_id: branch_id
      };
  
      return userWithBranchId;
    } catch (e:any) {
      logger.error(e.message);
      serverErrorResponse(500, { result: e.message });
      return;
    }
  }


  @SuccessResponse(200)
  @Post('deleterequest_url')
  public async deleterequest_url(
    @Request() req: express.Request,
    @Res() notFoundResponse: TsoaResponse<404, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
    @Res() unauthorizedResponse: TsoaResponse<401, {}>,
  ) {
    try {
      console.log("Delete Request : " + JSON.stringify(req.body));
    
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, {});
    }
  }
}


