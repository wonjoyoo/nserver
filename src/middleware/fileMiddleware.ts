import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

// 날짜별 디렉토리와 파일명을 생성하는 함수
const generateFileName = (originalName: string, useDateDirs: boolean): string => {
  if (!useDateDirs) {
    return originalName;
  }
  
  const now = new Date();
  const datePath = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
  const time = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}_${String(now.getMilliseconds()).padStart(3, '0')}`;
  const ext = path.extname(originalName);
  
  return `${datePath}/${time}${ext}`;
};

export const handleFile = (req: express.Request, directoryName: string, fieldName = 'file', useDateDirs = false): Promise<void> => {
  const s3 = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials:{
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
  });
  
  const uploadStrategy = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET as string,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req: express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
        const fileName = generateFileName(file.originalname, useDateDirs);
        callback(null, `${directoryName}/${fileName}`);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 20,
    },
  }).single(fieldName);

  return new Promise((resolve, reject) => {
    uploadStrategy(req, undefined, async (err: any) => {
      if (err) {
        console.log('file upload error  => ', err);
        reject(err);
      }
      resolve();
    });
  });
};

export const handleMultipleFiles = (req: express.Request, directoryName: string, fieldName = [{ name: 'files' }], useDateDirs = false): Promise<void> => {
  console.log('handleMultipleFiles');
  const s3 = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials:{
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
  });

  const uploadStrategy = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET as string,
      key(req: express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
        const fileName = generateFileName(file.originalname, useDateDirs);
        callback(null, `${directoryName}/${fileName}`);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 20,
    },
  }).fields(fieldName);

  return new Promise((resolve, reject) => {
    uploadStrategy(req, undefined, async (err: any) => {
      if (err) {
        console.log('file upload error  => ', err);
        reject(err);
      }
      resolve();
    });
  });
};
