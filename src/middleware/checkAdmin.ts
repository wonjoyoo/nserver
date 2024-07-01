import { getCustomRepository } from 'typeorm';
import { AdminRepository } from '../repositories/AdminRepository';
import { AdminType } from '../types/enum';

export const checkAdmin = async (adminId: number): Promise<boolean> => {
  const adminRepo = getCustomRepository(AdminRepository);
  const admin = await adminRepo.findByPK(adminId);
  return new Promise((resolve, reject) => {
    if (!admin) {
      reject();
      return;
    }
    resolve(admin.adminType === AdminType.ADMIN);
  });
};
