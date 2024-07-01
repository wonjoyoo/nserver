# TypeORM 기반 API Server

## [데이터베이스 구성]
1. mysql 8.0.37 (AWS RDS 최신버전)

2. Database 생성
Create Database testdb;

3. User생성
```
CREATE USER 'dbuser1'@'%' IDENTIFIED BY '1111';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'dbuser1'@'%' WITH GRANT OPTION;
GRANT CREATE TEMPORARY TABLES ON testdb.* TO 'dbuser1'@'%';
FLUSH PRIVILEGES;
```

4. 테이블 생성
    ```
    CREATE TABLE testdb.`User` (
    `id` int NOT NULL AUTO_INCREMENT,
    `userid` varchar(45) NOT NULL,
    `password` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `phone` varchar(255) NOT NULL,
    `phoneVerified` tinyint DEFAULT '0',
    `name` varchar(255) DEFAULT NULL,
    `userType` enum('admin','user') NOT NULL DEFAULT 'user' ,
    `status` enum('active','hold') DEFAULT 'active',
    `gender` enum('male','female') DEFAULT NULL,
    `avatar` varchar(255) DEFAULT NULL,
    `accessToken` varchar(1024) DEFAULT NULL,
    `pushToken` varchar(255) DEFAULT NULL,
    `appleToken` varchar(255) DEFAULT NULL,
    `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
    `deletedAt` datetime(6) DEFAULT NULL,
    `emailVerified` tinyint DEFAULT '0',
    PRIMARY KEY (`id`,`userid`),
    KEY `phone` (`phone`)
    ) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    ```
## [샘플 실행]
4. nserver 디렉토리에서 yarn 실행
    ```
    yarn
    ```
    - npm으로 해도 됨. 여기서는 yarn으로 설명
    - typeorm 0.2.30 사용
    - node는 18.9 사용

5. 환경파일 생성
아래와 같이 히든파일인 .env 파일 생성해야 함
    ``` 
    #NODE_ENV=production
    NODE_ENV=development

    DB_HOST=localhost
    DB_USER=dbuser1
    DB_PASS=1111
    DB_NAME=testdb
    DB_PORT=3306

    TYPEORM_TIMEZONE="+09:00"

    AWS_ACCESS_KEY_ID=AWSXXXXXXXXXX
    AWS_SECRET_ACCESS_KEY=AWSXXXXXXXXXXXXXX
    AWS_S3_REGION=ap-northeast-2
    AWS_S3_BUCKET=AWSXXXXXXXXXXXX


    APP_PORT=9000

    SECRET=ffafdaf577d5d8ab2ebccfa76e4e07800177884283407a2cdbaf9b09de162608a59fdb2d4157ec1259be99cb76a88ba89e0f151803e0dd7d79a3305cb455f25b
    ```


6. route 파일 생성 (Controller 에 새로운 path를 만들때 마다 실행해야 함)
    ```
    yarn tsoa
    ```
7. 개발서버 시작
    ```
    yarn dev
    ```    


8. API 테스트 - http://localhost:9000/api-docs/ 
    1. auth/user/register 로 User 생성 테스트
    2. auth/user/login 으로 위에서 생성한 ID/Password로 로그인 테스트
---

## 참고사항

1. User Entity의 Password는 아래 코드에 의해 Insert시에 자동 암호화 되어 insert됨.
    ```
	@BeforeInsert()
    async setPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
    ```
    그래서 password Update시에는 아래 코드를 별도로 넣어야 함. (현재 반영됨)
    ```
  	const salt = await bcrypt.genSalt(12);
  	requestBody.password = await bcrypt.hash(req.body.password, salt);
    ```

3. Token만료기간
UserRepository.ts에서 아래 코드에 있음.
    ```
    generateToken(user: User) {
        return jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            },
            process.env.SECRET!,
            {
                expiresIn: 60 * 60 * 24 * 30,
            },
        )
    }
    ```
2. FileUpload 방법
client에서 multi-part로 넘기고, 서버에서 아래코드 사용하면 AWS의 S3에 upload됨.(.env에 설정한 bucket에 upload됨)
    ```
    await handleFile(req, 'branch', 'file', true);
    const file = req.file as Express.MulterS3.File;
    console.log("file=" + file.location);
    return file.location;
    ```
3. typeorm 참고 URL
https://tsoa-community.github.io/docs/getting-started.html


## [중요 운영환경 관련 내용]

1. server.ts에 서버 주소 설정

2. ts-node pm2설치
pm2를 설치하여 아래와 같이 daemon으로 구동해야 함.
```
실행: yarn pm2:start
종료: yarn pm2:stop
```
3. .env에서 사용하는 secret은 64비트로 아래코드로 임의 생성하여 Update
```
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);
```