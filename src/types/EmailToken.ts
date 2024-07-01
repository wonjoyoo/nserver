import { EmailType, Site } from './enum';

export interface EmailTokenCreate {
  emailType: EmailType;
  site: Site;
  userID: number;
  expireDate: Date;
  isVerified: boolean;
  token: string;
}