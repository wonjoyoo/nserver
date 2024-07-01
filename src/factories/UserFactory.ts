import {define} from 'typeorm-seeding';
import {User} from '../entities/User';
import Faker from 'faker';
import {UserStatus, UserType, Gender} from '../types/enum';

define(User, (faker: typeof Faker) => {
    const user = new User();
    user.name = 'tester';
    user.email = `user@test.com`;
    user.password = 'password';
    user.phone = '010-5234-3678';
    user.phoneVerified = true;
    user.userType = UserType.USER;
    user.status = UserStatus.ACTIVE;
    user.avatar = '';
    user.birthday = '1999-10-07';
    user.pushEnabled = false;
    user.gender = Gender.MALE
    return user;
});
