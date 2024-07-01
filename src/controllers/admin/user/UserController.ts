import {
  Controller,
  Get,
  Query,
  Res,
  Route,
  Security,
  SuccessResponse,
  Tags,
  TsoaResponse,
  Path,
  Patch,
  Body, Post, Request, Delete,
} from 'tsoa';
import { getCustomRepository } from 'typeorm';
import { handleFile } from '../../../middleware/fileMiddleware';
import UserRepository from '../../../repositories/UserRepository';
import { UsersResponse, UserResponse, UserPatch, UserRegister, UserChangeStatus } from './User';
import logger from '../../../libs/logger';
import express from "express";
import bcrypt from 'bcrypt';
import {LoginProvider} from "../../../types/enum";

@Route('admin/user')
@Tags('user')
export class UserController extends Controller {
  @SuccessResponse(200)
  @Security('jwt')
  @Get('userlist')
  public async list(
    @Res() serverErrorResponse: TsoaResponse<500, { reason: string }>,
    @Query() page?: number,
    @Query() limit?: number,
    @Query() searchcond?: string
  ) {
    try {
      console.log("page="+page + ",searchcond=" + searchcond);
      const userRepo = getCustomRepository(UserRepository);
      const users = await userRepo.findList(page ? page : 1, limit, searchcond);
      //const users = await userRepo.findListAll();
      //this.setHeader('total', String(total));
      return users as unknown as UsersResponse[];
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, { reason: e.message });
    }
  }

  @SuccessResponse(204)
  @Post('register')
  @Security('jwt')
  public async register(
    @Request() req: express.Request,
    @Res() conflictResponse: TsoaResponse<409, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      //await handleFile(req, 'user/avatar');
      const requestBody: UserRegister = req.body;
      //const file = req.file as Express.MulterS3.File;
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByEmail(requestBody.email);
      if (user) {
        conflictResponse(409, {});
        return;
      }
      //await userRepo.register(requestBody, file);
      await userRepo.register(requestBody);
      const userData = await userRepo.findByEmail(requestBody.email);
      
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, e.message);
    }
  }

  @SuccessResponse(200)
  @Security('jwt')
  @Get('{id}')
  public async read(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
    @Res() serverErrorResponse: TsoaResponse<500, { reason: string }>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findByPkApp(id);
      if (!user) {
        notFoundResponse(404, { reason: 'Not Found' });
        return;
      }
      return user as unknown as UserResponse;
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, { reason: e.message });
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
      const userRepo = getCustomRepository(UserRepository);
      //await handleFile(req, 'user/avatar');
      const requestBody: UserPatch = req.body;

      if (req.body.password != null && req.body.password !== undefined && req.body.password != "") {
        const salt = await bcrypt.genSalt(12);
        requestBody.password = await bcrypt.hash(req.body.password, salt);
      } else {
        delete requestBody.password; // password 필드가 null 또는 undefined인 경우 제거
      }

      /*if (req.file) {
        const file = req.file as Express.MulterS3.File;
        requestBody.avatar = file.location;
      }*/

      // @ts-ignore
      //delete requestBody['file'];

      await userRepo.updateByPk(requestBody, id);
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, { d: e.message });
    }
  }

  @SuccessResponse(204)
  @Security('jwt')
  @Delete('{id}')
  public async delete(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, {}>,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findOne(id);
      if (!user) {
        notFoundResponse(404, {});
        return;
      }
      console.log('DELETE 성공')
      await userRepo.softDelete(id);
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, {});
    }
  }

  @SuccessResponse(204)
  @Security('jwt')
  @Patch('apiAproveQuit/{id}')
  public async updateStatus(
    @Path() id: number,
    @Body() requestBody: UserChangeStatus,
    @Res() serverErrorResponse: TsoaResponse<500, {}>,
  ) {
    try {
      const userRepo = getCustomRepository(UserRepository);
      await userRepo.updateStatus(id, requestBody);
    } catch (e: any) {
      logger.error(e.message);
      serverErrorResponse(500, {});
    }
  }
}


