import { TPermissions, TRole } from './role.model';

export interface IUserRole {
  id?: number;
  name: TRole;
  permissions: TPermissions[];
}

export interface IAuthUser {
  user_id: string;
  name: string;
  nickname?: string;
  familyName?: string;
  givenName?: string;
  picture?: string;
  username?: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  phone_number?: string;
  last_password_reset?: Date;
  last_login?: Date;
  last_ip?: string;
  logins_count?: number;
  created_at?: Date;
  updated_at?: Date;
  blocked: boolean;
  identities?: TAuth0Identities[];
  role: IUserRole;
  user_metadata: Record<string | number, any>;
  app_metadata: Record<string | number, any>;
}

export type TAuth0Identities = {
  connection: string;
  provider: string;
  user_id: string | null;
  isSocial: boolean;
}
