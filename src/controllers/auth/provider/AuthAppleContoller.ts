import express from "express";
import {Route, Tags, Controller, SuccessResponse, Body, Post, Request, Get, Query} from 'tsoa';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../../repositories/UserRepository';
import { AuthUserResponse } from '../user/AuthUser';
import {io} from "../../../app";
import {LoginProvider} from "../../../types/enum";
import logger from '../../../libs/logger'

@Route('auth/apple')
@Tags('auth')
export class AuthAppleController extends Controller {
    @SuccessResponse(302)
    @Post('apple_user_redirect')
    public async appleUserRedirect(
        @Request() req: express.Request,
    ) {
        try {
            console.log("apple_user_redirect...");
            const requestBody = req.body
            const userRepo = getCustomRepository(UserRepository);
console.log(requestBody);
            const exit = await userRepo.findByAppleToken(requestBody.identityToken)
            let token
            let sendUser
            console.log("exit=" + exit);
            if (!exit) {
                const user = await userRepo.appleRegister(requestBody);

                token = userRepo.generateKakaoToken(user);
                sendUser = await userRepo.sendAuth(user.id) as unknown as AuthUserResponse

                sendUser.referralCode = "A" + (user.id + 1000);
                await userRepo.updateByPk(sendUser, user.id);
                sendUser.isNew = 1;
            } else {
                token = userRepo.generateKakaoToken(exit);
                sendUser = exit;
            }
            sendUser.accessToken = token
            console.log('sendUser====');
            console.log(sendUser);

            // 동시접속 모드 불가 기능(현재 필요 없음): 메세지 전달:
            //io.emit('server_login', {msg: '서버에서 새로운 정보 갱신 요청이 왔습니다.(from login)', data: {userId:sendUser.id,socketId:requestBody.socketId}});

            return sendUser
        } catch (e:any) {
            logger.error(e);
            console.log('error!')
            const error = e as AxiosError
            //console.log(error.response);
            console.log(e.message)
        }
    }
}




