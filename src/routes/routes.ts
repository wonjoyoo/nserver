/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../controllers/admin/admin/AdminController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/admin/user/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthAdminController } from './../controllers/auth/admin/AuthAdminController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthKakaoController } from './../controllers/auth/provider/AuthKakaoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthUserController } from './../controllers/auth/user/AuthUserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthAppleController } from './../controllers/auth/provider/AuthAppleContoller';
import { expressAuthentication } from './../middleware/jwtMiddleware';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "AdminType": {
        "dataType": "refEnum",
        "enums": ["super_admin","admin","ads_viewer","store_viewer"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminsResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminPwResponse": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminRegister": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminPatch": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminPatchPw": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserType": {
        "dataType": "refEnum",
        "enums": ["admin","user","branch","owner","bo"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserStatus": {
        "dataType": "refEnum",
        "enums": ["active","quit","hold"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Gender": {
        "dataType": "refEnum",
        "enums": ["male","female"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsersResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userid": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "userType": {"ref":"UserType","required":true},
            "status": {"ref":"UserStatus","required":true},
            "gender": {"ref":"Gender","required":true},
            "avatar": {"dataType":"string","required":true},
            "birthday": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userid": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "userType": {"ref":"UserType","required":true},
            "status": {"ref":"UserStatus","required":true},
            "gender": {"ref":"Gender","required":true},
            "avatar": {"dataType":"string","required":true},
            "birthday": {"dataType":"string","required":true},
            "createdAt": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserChangeStatus": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"UserStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthAdminResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
            "accessToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthAdminRegister": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "adminType": {"ref":"AdminType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthAdminLogin": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userid": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "phoneVerified": {"dataType":"boolean","required":true},
            "emailVerified": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "userType": {"ref":"UserType","required":true},
            "status": {"ref":"UserStatus","required":true},
            "gender": {"ref":"Gender","required":true},
            "avatar": {"dataType":"string","required":true},
            "accessToken": {"dataType":"string","required":true},
            "pushToken": {"dataType":"string","required":true},
            "appleToken": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LogoutKakaoResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUserRegister": {
        "dataType": "refObject",
        "properties": {
            "userid": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "confirmpassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userid": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "userType": {"ref":"UserType","required":true},
            "status": {"ref":"UserStatus","required":true},
            "phoneVerified": {"dataType":"double","required":true},
            "emailVerified": {"dataType":"double","required":true},
            "accessToken": {"dataType":"string","required":true},
            "branch_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUserLogin": {
        "dataType": "refObject",
        "properties": {
            "userid": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/admin/admin/userlist',

            function AdminController_list(request: any, response: any, next: any) {
            const args = {
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    page: {"in":"query","name":"page","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.list.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/admin/password/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AdminController_readPassword(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.readPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/admin/register',

            function AdminController_register(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AdminRegister"},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/admin/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AdminController_read(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.read.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/admin/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AdminController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AdminPatch"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/admin/password/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AdminController_updatePw(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AdminPatchPw"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.updatePw.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/admin/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AdminController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/user/userlist',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_list(request: any, response: any, next: any) {
            const args = {
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    page: {"in":"query","name":"page","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    searchcond: {"in":"query","name":"searchcond","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.list.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/user/register',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_register(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/user/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_read(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.read.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/user/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/user/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/user/apiAproveQuit/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function UserController_updateStatus(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserChangeStatus"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.updateStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/admin/register',

            function AuthAdminController_register(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AuthAdminRegister"},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthAdminController();


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/admin/login',

            function AuthAdminController_login(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AuthAdminLogin"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthAdminController();


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/admin/logout',

            function AuthAdminController_logout(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthAdminController();


              const promise = controller.logout.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/admin/check',
            authenticateMiddleware([{"jwt":[]}]),

            function AuthAdminController_check(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthAdminController();


              const promise = controller.check.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/kakao/kakao_user_redirect',

            function AuthKakaoController_kakaoUserRedirect(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthKakaoController();


              const promise = controller.kakaoUserRedirect.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/kakao/kakao_user_login_register',

            function AuthKakaoController_kakaoUserLoginRegister(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthKakaoController();


              const promise = controller.kakaoUserLoginRegister.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/kakao/kakao_user_redirect',

            function AuthKakaoController_kakaoUserRedirectGet(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthKakaoController();


              const promise = controller.kakaoUserRedirectGet.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/kakao/kakao_user_logout_redirect',

            function AuthKakaoController_kakaoUserLogoutRedirect(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthKakaoController();


              const promise = controller.kakaoUserLogoutRedirect.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/kakao/actionlog/:page',

            function AuthKakaoController_ActionLog(request: any, response: any, next: any) {
            const args = {
                    page: {"in":"path","name":"page","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthKakaoController();


              const promise = controller.ActionLog.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/register',

            function AuthUserController_register(request: any, response: any, next: any) {
            const args = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AuthUserRegister"},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/login',

            function AuthUserController_login(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AuthUserLogin"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/adminlogin',

            function AuthUserController_adminlogin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AuthUserLogin"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.adminlogin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/auth/user/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AuthUserController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/user/check',

            function AuthUserController_checkAuth(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.checkAuth.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/user/logout',

            function AuthUserController_logout(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"enum","enums":[null]},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"enum","enums":[null]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.logout.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/lost_password',

            function AuthUserController_lostPassword(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"enum","enums":[null]},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"enum","enums":[null]},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"enum","enums":[null]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.lostPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/check_temppassword',

            function AuthUserController_checkTempPassword(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"enum","enums":[null]},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"enum","enums":[null]},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"enum","enums":[null]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.checkTempPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/reset_password',

            function AuthUserController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"newPassword":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"enum","enums":[null]},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"enum","enums":[null]},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"enum","enums":[null]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.resetPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/user/userlist',

            function AuthUserController_userlist(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    page: {"in":"query","name":"page","required":true,"dataType":"double"},
                    limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"enum","enums":[null]},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"enum","enums":[null]},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"enum","enums":[null]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.userlist.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/delete',

            function AuthUserController_delete(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/user/getuser/:id',
            authenticateMiddleware([{"jwt":[]}]),

            function AuthUserController_getUserInfo(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    conflictResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.getUserInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/user/deleterequest_url',

            function AuthUserController_deleterequest_url(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
                    unauthorizedResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthUserController();


              const promise = controller.deleterequest_url.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/apple/apple_user_redirect',

            function AuthAppleController_appleUserRedirect(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthAppleController();


              const promise = controller.appleUserRedirect.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
