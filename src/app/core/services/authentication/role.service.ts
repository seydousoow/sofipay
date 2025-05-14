import { inject, Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';
import { TPermissions, TRole } from '../../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private currentUserService: CurrentUserService = inject(CurrentUserService);

  get isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  get isClient(): boolean {
    return this.role === 'CUSTOMER';
  }

  get isEnterprise(): boolean {
    return this.role === 'CORPORATE';
  }

  private get isActive(): boolean {
    if (this.currentUserService.currentUser == undefined) return false;
    return !this.currentUserService.currentUser.blocked;
  }

  private get role(): TRole | undefined {
    return this.currentUserService.currentUser?.role?.name;
  }

  isOfProfile(profile: TRole): boolean {
    return this.role === profile;
  }

  hasSomePermissions(permissions: TPermissions[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasPermission(permission: TPermissions): boolean {
    const currentUser = this.currentUserService.currentUser;
    if (!currentUser) return false;
    return this.isActive && (currentUser.role.permissions ?? []).includes(permission);
  }

}
