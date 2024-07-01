import {EntityRepository, Repository} from 'typeorm'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { FindConditions, Like } from 'typeorm';

import {AuthUserAddRegisterData} from '../controllers/auth/user/AuthUser'
import {
    KakaoUserRegister,
    UserChangeStatus,
    UserPatch,
    UserRegister,

} from '../controllers/admin/user/User'
import {User} from '../entities/User'
import {LoginProvider, UserStatus, UserType} from '../types/enum'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    //register(data: UserRegister, file: Express.MulterS3.File) {
    register(data: UserRegister) {
        const user = new User()
        user.userid = data.userid
        user.email = data.email
        user.phone = data.phone
        user.name = data.name
        user.userType = data.userType
        user.status = UserStatus.ACTIVE
        user.gender = data.gender
        user.password = data.password

        console.log("userrepo=" + user.password)
        //user.avatar = file.location
        return this.save(user)
    }

    async findList(page = 1, limit = 10, searchcond?: string) {
        const where: FindConditions<any>[] = [];
        
        if (searchcond) {
          where.push(
            { userid: searchcond },
            { email: Like(`%${searchcond}%`) },
            { phone: Like(`%${searchcond}%`) },
            { name: Like(`%${searchcond}%`) }
          );
        }
      
        const [results, total] = await Promise.all([
          this.find({
            select: ['id', 'userid', 'email', 'phone', 'name', 'userType', 'status', 'gender', 'avatar', 'createdAt'],
            where: searchcond ? where : {},
            order: { createdAt: 'DESC' }, // Order by createdAt in descending order
            skip: (page - 1) * limit,
            take: limit,
          }),
          this.count({ where: searchcond ? where : {} })
        ]);
      
        return { data: results, total };
    }
      
    findListAll() {
        return this.find({
            select: ['id', 'userid', 'email', 'phone', 'name', 'userType', 'status','gender', 'avatar', 'createdAt'],
            relations:['userLoginMethods'],
            where:{
                deletedAt: null
            },
            order:{
                createdAt:"DESC"
            }
        })
    }

    findListAllByPush() {
        return this.find({
            where:{status:UserStatus.ACTIVE,pushEnabled:'1'}
        })
    }

    findByPK(id: number) {
        return this.createQueryBuilder('u')
            .where('u.id = :id', {id: id})
            .select(['u.id', 'u.userid', 'u.email', 'u.phone', 'u.name', 'u.userType',  'u.status', 'u.gender', 'u.avatar'])
            .getOne()
    }

    findByPkApp(id: number) {
        return this.createQueryBuilder('u')
            .where('u.id = :id', {id: id})
            .select(['u.id', 'u.userid', 'u.email', 'u.phone', 'u.name', 'u.userType', 'u.status', 'u.gender', 'u.avatar', 'u.accessToken', 'u.createdAt'])
            .getOne()
    }

    findByEmail(email: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType', 'status','gender', 'avatar'],
            where: {
                email,
            },
        })
    }

    findByUserid(userid: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType',  'status',  'gender', 'avatar'],
            where: {
                userid,
            },
        })
    }

    findByPhone(phone: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType',  'status',  'gender', 'avatar'],
            where: {
                phone,
            },
        })
    }

    findByUseridOrEmailOrPhone(userid: string, email: string, phone: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType', 'status',  'gender', 'avatar'],
            where: [
                { userid },
                { email },
                { phone }
            ]
        });
    }
    
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

    generateKakaoToken(user: User) {
        return jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                },
            },
            process.env.SECRET!,
            {
                expiresIn: 60 * 60 * 24 * 7,
            },
        )
    }

    sendUser(id: number) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'phone', 'name', 'userType','status', 'gender',   'avatar'],
            where: {
                id,
            },
        })
    }

    sendAuth(id: number) {
        //active 인 user만 가져오도록 수정
        return this.findOne({
            select: ['id', 'userid', 'email', 'phone', 'name', 'userType', 'status',  'gender', 'avatar', 'accessToken', 'createdAt'],
            where: {
                id,
                status:UserStatus.ACTIVE
            },
        })
    }

    updateByPk(data: UserPatch, id: number) {

        return this.update({
            id,
        }, {
            ...data,
        })
    }
    
    updateTokenByPk(token: string, id: number) {
        return this.update({ id }, { accessToken: token });
    }    

    updateByRegister(user: User, data: AuthUserAddRegisterData) {
        if (data.name) {
            user.name = data.name
        }
        user.status = UserStatus.ACTIVE
        user.phone = data.phone
        return this.save(user)
    }

    updateStatus(id: number, data: UserChangeStatus) {
        return this.update({
            id,
        }, {
            ...data,
        })
    }


    async resetPassword(user: User, password: string) {
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(password, salt)
        return this.save(user)
    }


    // ** 카카오 로그인 검토중
    findByKakaoAvatar(avatar: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType',  'status','gender', 'avatar'],
            where: {
                avatar,
            },
        })
    }

    findByKakaoEmail(email: string) {
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType', 'status', 'gender', 'avatar'],
            where: {
                email,
            },
        })
    }

    findByAppleToken(token: string){
        return this.findOne({
            select: ['id', 'userid', 'email', 'password', 'phone', 'name', 'userType', 'status', 'gender', 'avatar', 'accessToken', 'createdAt'],
            where: {
                appleToken:token,
            },
        })
    }

    appleRegister(data:any) {
        const user = new User()
        if(data.email){
            user.email = data.email
        }
        console.log("appleRegister");
        console.log(data);
        if(data.credential.fullName){
            user.name = data.credential.fullName.familyName + " " + data.credential.fullName.givenName;
        }
        user.avatar = 'https://playgoout.s3.ap-northeast-2.amazonaws.com/user/avatar/default_avatar.jpg'
        user.status = UserStatus.ACTIVE
        user.appleToken = data.identityToken
        return this.save(user)
    }

    kakaoRegister(data: AuthKakaoResponse) {
        console.log("data.kakao_account.profile.profile_nickname	=" + data.kakao_account.profile.nickname)
        const user = new User()
        user.email = data.kakao_account.email
        user.avatar = data.kakao_account.profile.thumbnail_image_url
        user.name = data.kakao_account.profile.nickname	
        user.status = UserStatus.ACTIVE
        return this.save(user)
    }

    kakaoUserRegister(data: KakaoUserRegister, id: number) {
        const user = new User()
        //user.email = data.email
        user.phone = data.phone
        user.name = data.name
        user.userType = UserType.USER
        user.gender = data.gender
        user.accessToken = data.accessToken
        return this.update({
            id,
        }, {
            ...user,
        })
    }
}

export default UserRepository
