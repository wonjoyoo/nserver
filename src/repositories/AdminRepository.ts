import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {EntityRepository, Repository, Not} from 'typeorm';
import {Admin} from '../entities/Admin';
import {AdminRegister, AdminPatch, AdminPatchPw} from '../controllers/admin/admin/Admin';
import {AdminType} from "../types/enum";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    register(data: AdminRegister) {
        const admin = new Admin();
        admin.email = data.email;
        admin.phone = data.phone;
        admin.name = data.name;
        admin.password = data.password;
        admin.adminType = data.adminType;
        return this.save(admin);
    }

    findList(page = 1) {
        return this.find({
            select: ['id', 'userid', 'email', 'phone', 'name', 'userType', 'status',  'avatar', 'phoneVerified', 'emailVerified', 'createdAt'],
            skip: (page - 1) * 20,
            take: 20,
        });
    }

    findListAll() {
        return this.find({
            select: ['id', 'email', 'phone', 'name', 'adminType', 'createdAt'],
            where: {
                adminType: Not(AdminType.SUPER_ADMIN),
            }
        });
    }

    findByEmail(email: string) {
        return this.findOne({
            select: ['id', 'email', 'phone', 'name', 'adminType', 'password', 'createdAt'],
            where: {
                email,
            },
        });
    }

    generateToken(admin: Admin) {
        return jwt.sign(
            {
                admin: {
                    id: admin.id,
                    email: admin.email,
                    createdAt: admin.createdAt,
                },
            },
            process.env.SECRET!,
            {
                expiresIn: 60 * 60 * 24 * 7,
            },
        );
    }

    findByPK(id: number) {
        return this.findOne({
            select: ['id', 'email', 'phone', 'name', 'adminType', 'createdAt'],
            where: {id},
            relations: ['advertiser']
        });
    }

    findByPKToPw(id: number) {
        return this.findOne({
            select: ['password'],
            where: {
                id,
            },
        });
    }

    updateByPk(data: AdminPatch, id: number) {
        console.log('updateByPk')
        console.log('data : ', data)
        const admin = new Admin();
        admin.email = data.email;
        admin.phone = data.phone;
        admin.name = data.name;
        admin.password = data.password;
        admin.adminType = data.adminType;
        if (data.advertiserId) {
            admin.advertiser = <Advertiser>{id: data.advertiserId};
        }
        return this.update({
            id,
        }, {
            ...admin,
        });
    }

    updatePwByPk(data: AdminPatchPw, id: number) {
        return this.update({
            id,
        }, {
            ...data,
        });
    }

    async updateById(data: Admin, adminId: number) {
        const admin = await this.findByPK(adminId);
        return this.save({
            ...admin,
            ...data,
        });
    }

    async resetPassword(admin: Admin, password: string) {
        const salt = await bcrypt.genSalt(12);
        admin.password = await bcrypt.hash(password, salt);
        return this.save(admin);
    }

    sendAdmin(id: number) {
        return this.findOne({
            select: ['id', 'email', 'phone', 'name', 'password', 'adminType'],
            where: {
                id,
            },
        });
    }

    sendAuth(id: number) {
        return this.findOne({
            select: ['id', 'email', 'phone', 'name', 'password', 'adminType'],
            where: {
                id,
            },
        });
    }

}
