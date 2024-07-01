import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert, OneToMany, OneToOne, JoinColumn, ManyToOne
} from 'typeorm';
import bcrypt from 'bcrypt';
import {AdminType} from '../types/enum';


@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: AdminType,
    })
    adminType: AdminType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    async setPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }


}
