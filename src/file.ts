import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

export const handleFile = (req: express.Request, directoryName: string, fieldName = 'file'): Promise<void> => {
    AWS.config.update({ region: process.env.AWS_S3_REGION,});

    //const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials:{
            accessKeyId:'',
            secretAccessKey:''
        }
    })

    const uploadStrategy = multer({
        storage: multerS3({
            s3: s3,
            bucket: String(process.env.AWS_S3_BUCKET),
            metadata: function(req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
                const identifier = Math.random().toString().replace(/0\./, '');
                callback(null, `${directoryName}/${identifier}-${file.originalname}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 20,
        },
    }).single(fieldName);
    return new Promise((resolve, reject) => {
        // @ts-ignore
        uploadStrategy(req, undefined, async (err: any) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

export const handleMultipleFiles = (req: express.Request, directoryName: string, filedName = [{ name: 'files' }]): Promise<void> => {
    //const s3 = new AWS.S3();
    const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials:{
            accessKeyId:'',
            secretAccessKey:''
        }
    })

    const uploadStrategy = multer({
        storage: multerS3({
            s3: s3,
            bucket: String(process.env.AWS_S3_BUCKET),
            key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
                const identifier = Math.random().toString().replace(/0\./, '');
                callback(null, `${directoryName}/${identifier}-${file.originalname}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 20,
        },
    }).fields(filedName);
    return new Promise((resolve, reject) => {
        // @ts-ignore
        uploadStrategy(req, undefined, async (err: any) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};


export const handleApplicantMultipleFiles = (req: express.Request, directoryName: string): Promise<void> => {
    //const s3 = new AWS.S3();
    const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials:{
            accessKeyId:'',
            secretAccessKey:''
        }
    })

    const uploadStrategy = multer({
        storage: multerS3({
            s3: s3,
            bucket: String(process.env.AWS_S3_BUCKET),
            key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
                const identifier = Math.random().toString().replace(/0\./, '');
                callback(null, `${directoryName}/${identifier}-${file.originalname}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 100,
        },
    }).fields([
        { name: 'resume' },
        { name: 'tax' },
        { name: 'passport' },
        { name: 'degree' },
    ]);
    return new Promise((resolve, reject) => {
        // @ts-ignore
        uploadStrategy(req, undefined, async (err: any) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};


export const handleTutorMultipleFiles = (req: express.Request, directoryName: string): Promise<void> => {
    //const s3 = new AWS.S3();
    const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials:{
            accessKeyId:'',
            secretAccessKey:''
        }
    })

    const uploadStrategy = multer({
        storage: multerS3({
            s3: s3,
            bucket: String(process.env.AWS_S3_BUCKET),
            key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
                const identifier = Math.random().toString().replace(/0\./, '');
                callback(null, `${directoryName}/${identifier}-${file.originalname}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 20,
        },
    }).fields([
        { name: 'photo' },
        { name: 'video' },
    ]);
    return new Promise((resolve, reject) => {
        // @ts-ignore
        uploadStrategy(req, undefined, async (err: any) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
