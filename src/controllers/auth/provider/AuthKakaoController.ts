import express from "express";
import {Route, Tags, Controller, SuccessResponse, Body, Post, Request, Get, Query, Path} from 'tsoa';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../../repositories/UserRepository';
import { AuthUserResponse } from '../user/AuthUser';
import {io} from "../../../app";
import {LoginProvider} from "../../../types/enum";
import logger from '../../../libs/logger'

@Route('auth/kakao')
@Tags('auth')
export class AuthKakaoController extends Controller {
  @SuccessResponse(302)
  @Post('kakao_user_redirect')
  public async kakaoUserRedirect(
    @Request() req: express.Request,
  ) {
    try {
      const kakaoToken = req.body.kakaoToken
      console.log('kakaoUserRedirect : kakaoToken => ', kakaoToken)

      const userConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${kakaoToken}` },
      };
      const userResponse: AxiosResponse<AuthKakaoResponse> = await axios.get('https://kapi.kakao.com/v2/user/me?secure_resource=true', userConfig);
      const userRepo = getCustomRepository(UserRepository);
console.log("userResponse.data.kakao_account.email=" + userResponse.data.kakao_account.email);
      //카카오 로그인 시 처리 검토중
      const exit = await userRepo.findByKakaoEmail(userResponse.data.kakao_account.email)
      //console.log(userResponse.data.kakao_account.email);
      //const exit = await userRepo.findByKakaoAvatar(userResponse.data.kakao_account.profile.thumbnail_image_url)
      let token
      let sendUser = exit;
      sendUser.isNew = 0;

      
console.log("kakao exit=" + exit);
      if (!exit) {
        const user = await userRepo.kakaoRegister(userResponse.data);

        token = userRepo.generateKakaoToken(user);
        sendUser = await userRepo.sendAuth(user.id) as unknown as AuthUserResponse
        
        sendUser.referralCode = "A" + (user.id + 1000);
        sendUser.isNew = 1;
        await userRepo.updateByPk(sendUser, user.id);
      } else {
        token = userRepo.generateKakaoToken(exit);
        //sendUser = await userRepo.sendAuth(exit.id) as unknown as AuthUserResponse // 필요없는 코드삭제:중복호출
      }
      sendUser.accessToken = token

      //const socketId = req.body.socketId;

      //io.emit('server_login', {msg: '서버에서 새로운 정보 갱신 요청이 왔습니다.(from login)', data: {userId:sendUser.id,socketId:socketId}});

      return sendUser
    } catch (e:any) {
      console.log('error!')
      const error = e as AxiosError
      //console.log(error.response);
      console.log(e.message)
    }
  }

  @SuccessResponse(302)
  @Post('kakao_user_login_register')
  public async kakaoUserLoginRegister(
    @Request() req: express.Request,
  ) {
    try {
      const kakaoToken = req.body.data.kakaoToken
      console.log('kakaoUserLoginRegister : kakaoToken => ', kakaoToken)

      const userConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${kakaoToken}` },
      };
      const userResponse = req.body;
      const userRepo = getCustomRepository(UserRepository);
console.log("userResponse.data.kakao_account.email=" + userResponse.data.kakao_account.email);
      const exit = await userRepo.findByKakaoEmail(userResponse.data.kakao_account.email)
      let token
      let sendUser = exit;
      
console.log("kakao exit=" + exit);
      if (!exit) {
        console.log("New User")
        const user = await userRepo.kakaoRegister(userResponse.data);
        
        token = userRepo.generateKakaoToken(user);
        sendUser = await userRepo.sendAuth(user.id) as unknown as AuthUserResponse
        
        sendUser.referralCode = "A" + (user.id + 1000);
        await userRepo.updateByPk(sendUser, user.id);
        sendUser.isNew = 1;
      } else {
        console.log("User Exist regenerate token")
        token = userRepo.generateKakaoToken(exit);
      }
      sendUser.accessToken = token


      //io.emit('server_login', {msg: '서버에서 새로운 정보 갱신 요청이 왔습니다.(from login)', data: {userId:sendUser.id,socketId:socketId}});

      return sendUser
    } catch (e:any) {
      console.log('error!')
      const error = e as AxiosError
      //console.log(error.response);
      console.log(e.message)
    }
  }

  @SuccessResponse(302)
  @Get('kakao_user_redirect')
  public async kakaoUserRedirectGet(
      @Request() req: express.Request,
  ) {
    try {
      return ''
    } catch (e:any) {
      console.log('error!')
      const error = e as AxiosError
      //console.log(error.response);
      console.log(e.message)
    }
  }

  @SuccessResponse(302)
  @Post('kakao_user_logout_redirect')
  public async kakaoUserLogoutRedirect(
      @Request() req: express.Request,
  ) {
    try {
      console.log("logout")
      const kakaoToken = req.body.kakaoToken

      const userConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${kakaoToken}`,'Content-Type':'application/x-www-form-urlencoded' },
      };
      console.log("logout2 userConfig=" + JSON.stringify(userConfig))

      const userResponse: AxiosResponse<LogoutKakaoResponse> = await axios.get('https://kapi.kakao.com/v1/user/logout', userConfig);
      console.log("logout3")

      return userResponse.data;

    } catch (e:any) {
      console.log('error!')
      logger.error(e);
      const error = e as AxiosError
      //console.log(error.response);
      console.log(e.message)
    }
  }


  @SuccessResponse(200)
  @Get('actionlog/{page}')
  public async ActionLog(
    @Path() page: string
  ) {
      try {
        let now = new Date();
        console.log("LOG: " + now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) + ": " + page);
      }catch(e:any){
        logger.error(e);
      }
  }
    
}




