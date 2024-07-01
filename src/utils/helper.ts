import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const successResponse = (req: Request, res: Response, data: any, code = 200) => {
  res.status(code).send(data);
};

export const errorResponse = (
  req: Request,
  res: Response,
  code = 500,
  message = '',
) => {
  console.log('error: ', message, ' , ', code);
  res.status(code).send({
    message: message,
  });
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const getAgeGroup = () => {

}

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const hasLength = (arr: any[]): boolean => {
  return arr && arr.length !== 0
}

export const shuffle = (array: any[]) =>  {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }

  return array
}


export const leftPad = (value:number) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export const toStringByFormatting = (source:Date, delimiter = '-') => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

export const getMinDifferent = (date1:Date) => {
  const date2 = new Date();     // 파라미터

  const elapsedMSec = date2.getTime() - date1.getTime();
  const elapsedMin = elapsedMSec / 1000 / 60;

  return parseInt(String(elapsedMin));
}

export const sendNotification = (title:string,content:string,pushToken:string) => {
  try {
    const payload = {
      to: pushToken,
      sound: 'default',
      title: title,
      body: content
    }

    const request = require('request');
    request.post({header:{
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "cache-control":"no-cache",
        host: "exp.host"
      },
      url:'https://exp.host/--/api/v2/push/send',
      body:payload,
      json:true,
      function(error:any,response:any,body:any){
        console.log(error);
        console.log(response);
        return response
      }})

  } catch (e: any) {
    return false
  }
}