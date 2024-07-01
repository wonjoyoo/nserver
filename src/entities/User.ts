import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    BaseEntity,
    BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';

import {UserStatus, UserType, Gender} from '../types/enum';

@Entity({
    name: 'user'
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    userid: string;

    @Column({nullable:true})
    email: string;

    @Column({nullable:false})
    phone: string;

    @Column({
        default: false,
        nullable: true,
    })
    phoneVerified: boolean;
    emailVerified: boolean;

    @Column()
    name: string;

    @Column({nullable:false})
    password: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.USER
    })
    userType: UserType;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
        nullable: true,
    })
    status: UserStatus;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender: Gender;

    @Column({
        nullable: true,
    })
    avatar: string;

    @Column({
        nullable: true,
        length: 1024,
    })
    accessToken: string

    @Column({nullable: true})
    pushToken: string

    @Column({nullable: true})
    appleToken: string


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;



    @BeforeInsert()
    async setPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}

