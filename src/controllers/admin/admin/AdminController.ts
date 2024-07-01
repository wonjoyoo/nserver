import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
    Request,
    Res,
    Route,
    Security,
    SuccessResponse,
    Tags,
    Path,
    Delete,
    TsoaResponse,
} from 'tsoa';
import { getCustomRepository } from 'typeorm';
import express from 'express';
import * as bcrypt from 'bcrypt';

import logger from '../../../libs/logger';

import { AdminsResponse, AdminResponse, AdminRegister, AdminPatch, AdminPwResponse, AdminPatchPw } from './Admin';
import { AdminRepository } from '../../../repositories/AdminRepository';


@Route('admin/admin')
@Tags('admin')
export class AdminController extends Controller {
    @SuccessResponse(200)
    //@Security('jwt')
    @Get('userlist')
    public async list(
        @Res() serverErrorResponse: TsoaResponse<500, { reason: string }>,
        @Query() page?: number
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);
            const admins = await adminRepo.findList(page ? page : 1);
            //const admins = await adminRepo.findListAll();
            return admins as unknown as AdminsResponse[];
        } catch (e: any) {
            logger.error(e.message);
            serverErrorResponse(500, { reason: e.message });
        }
    }

    @SuccessResponse(200)
    @Security('jwt')
    @Get('password/{id}')
    public async readPassword(
        @Path() id: number,
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
        @Res() serverErrorResponse: TsoaResponse<500, { reason: string }>,
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);
            const admin = await adminRepo.findByPKToPw(id);

            if (!admin) {
                notFoundResponse(404, { reason: 'Not Found' });
                return;
            }

            return admin as unknown as AdminPwResponse;
        } catch (e: any) {
            logger.error(e.message);
            serverErrorResponse(500, { reason: e.message });
        }
    }

    @SuccessResponse(204)
    @Post('register')
    public async register(
        @Request() req: express.Request,
        @Body() requestBody: AdminRegister,
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
            await adminRepo.register(requestBody);
        } catch (e: any) {
            logger.error(e.message);
            console.log('ERROR : ', e.message)
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
            const adminRepo = getCustomRepository(AdminRepository);
            const admin = await adminRepo.findByPK(id);

            if (!admin) {
                notFoundResponse(404, { reason: 'Not Found' });
                return;
            }

            return admin as unknown as AdminResponse;
        } catch (e: any) {
            logger.error(e.message);
            console.log('error : ', e.message)
            serverErrorResponse(500, { reason: e.message });
        }
    }

    @SuccessResponse(204)
    @Security('jwt')
    @Patch('{id}')
    public async update(
        @Path() id: number,
        @Body() requestBody: AdminPatch,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);
            await adminRepo.updateByPk(requestBody, id);
        } catch (e: any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
        }
    }

    @SuccessResponse(204)
    @Security('jwt')
    @Patch('password/{id}')
    public async updatePw(
        @Path() id: number,
        @Body() requestBody: AdminPatchPw,
        @Res() serverErrorResponse: TsoaResponse<500, {}>,
    ) {
        try {
            const adminRepo = getCustomRepository(AdminRepository);

            if (requestBody.password) {
                const salt = await bcrypt.genSalt(12);
                requestBody.password = await bcrypt.hash(requestBody.password, salt);
            }

            await adminRepo.updatePwByPk(requestBody, id);
        } catch (e: any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
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
            const adminRepo = getCustomRepository(AdminRepository);
            const admin = await adminRepo.findOne(id);
            if (!admin) {
                notFoundResponse(404, {});
                return;
            }
            console.log('DELETE 성공')
            await adminRepo.softDelete(id);
            //await adminRepo.delete(admin);
        } catch (e: any) {
            logger.error(e.message);
            serverErrorResponse(500, {});
        }
    }
}
