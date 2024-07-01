import {
    Body,
    Controller,
    Example,
    Get,
    Post,
    Request,
    Res,
    Route,
    Security,
    SuccessResponse,
    Tags,
    TsoaResponse,
} from 'tsoa';
import { getCustomRepository } from 'typeorm';
import express from 'express';
import * as bcrypt from 'bcrypt';
import passport from 'passport';

import logger from '../../../libs/logger';

import { AuthAdminLogin, AuthAdminRegister, AuthAdminResponse, AuthAdminToken } from './AuthAdmin';
import { AdminRepository } from '../../../repositories/AdminRepository';


@Route('auth/admin')
@Tags('auth')
export class AuthAdminController extends Controller {
    @SuccessResponse(201)
    @Post('register')
    public async register(
        @Request() req: express.Request,
        @Body() requestBody: AuthAdminRegister,
        @Res() conflictResponse: TsoaResponse<409, {}>,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);
            const admin = await adminRepo.findByEmail(requestBody.email);
            if (admin) {
                conflictResponse(409, {});
                return;
            }

            const newAdmin = await adminRepo.register(requestBody);
            const token = await adminRepo.generateToken(newAdmin);
            if (!token) {
                new Error('Can not generate token');
                return;
            }

            /*            const access_token = cookie.serialize('access_token', token, {
                            path: '/',
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7,
                        });
                        this.setHeader('Set-Cookie', access_token);*/
            this.setStatus(201);

            const sendAdmin = await adminRepo.sendAuth(newAdmin.id) as unknown as AuthAdminResponse;
            sendAdmin.accessToken = token;
            return sendAdmin;
        } catch (e:any) {
            logger.error(e.message);
            serverErrorResponse(500, e.message);
        }
    }

    @Example<AuthAdminLogin>({
        email: 'admin@test1.com',
        password: 'password',
    })
    @SuccessResponse(200)
    @Post('login')
    public async login(
        @Request() req: express.Request,
        @Body() requestBody: AuthAdminLogin,
        @Res() unauthorizedResponse: TsoaResponse<401, {}>,
        @Res() conflictResponse: TsoaResponse<409, {}>,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);
            const admin = await adminRepo.findByEmail(requestBody.email);

            if (!admin) {
                unauthorizedResponse(401, {});
                return;
            }

            const match = await bcrypt.compare(requestBody.password, admin.password);
            if (!match) {
                unauthorizedResponse(401, {});
                return;
            }

            const token = await adminRepo.generateToken(admin);
            if (!token) {
                new Error('Can not generate token');
                return;
            }

            /*            const access_token = cookie.serialize('access_token', token, {
                            path: '/',
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7, //7days
                        });
            
                        this.setHeader('Set-Cookie', access_token);*/
            const sendAdmin = await adminRepo.sendAuth(admin.id) as unknown as AuthAdminResponse;
            sendAdmin.accessToken = token;
            return sendAdmin;
        } catch (e:any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
            return;
        }
    }

    @SuccessResponse(204)
    @Get('logout')
    public async logout(
        @Request() req: express.Request,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            this.setHeader('Set-Cookie', `access_token=?; Max-Age=0; Path=/; HttpOnly`);
            return;
        } catch (e:any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
            return;
        }
    }

    @SuccessResponse(200)
    @Security('jwt')
    @Get('check')
    public async check(
        @Request() req: express.Request,
        @Res() unauthorizedResponse: TsoaResponse<401, {}>,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            const res = (<any>req).res as express.Response;
            const admin = await this.handleAdminAuth(req, res);
            if (!admin) {
                unauthorizedResponse(401, {});
                return;
            } else {
                const adminRepo = getCustomRepository(AdminRepository);
                const token = await adminRepo.generateToken(admin);
                if (!token) {
                    new Error('Can not generate token');
                    return;
                }
                /*const access_token = cookie.serialize('access_token', token, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 60 * 60 * 24 * 7,
                });

                this.setHeader('Set-Cookie', access_token);*/
                const sendAdmin = await adminRepo.sendAuth(admin.id) as unknown as AuthAdminResponse;
                sendAdmin.accessToken = token;
                return sendAdmin;
            }
        } catch (e:any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
            return;
        }
    }

    private handleAdminAuth(req: express.Request, res: express.Response): Promise<any> {
        console.log('handleAdminAuth!!!')
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', function (req: any, res: any) {
                console.log('passport.authenticate!!!')
                console.log('req: ', req);
                console.log('res: ', res);
                resolve(res);
            })(req, res);
        });
    }
}
