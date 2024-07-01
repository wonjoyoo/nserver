import { define } from 'typeorm-seeding';
import { Admin } from '../entities/Admin';
import Faker from 'faker';

import { AdminType } from '../types/enum';

define(Admin, (faker: typeof Faker) => {
  const admin = new Admin();
  admin.email = `admin@test.com`;
  admin.name = faker.name.firstName() + faker.name.lastName();
  admin.password = 'password';
  admin.adminType = AdminType.SUPER_ADMIN;
  admin.phone = faker.phone.phoneNumber();
  return admin;
});
