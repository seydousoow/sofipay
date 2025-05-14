import { inject, Injectable } from '@angular/core';
import { TPermissions, TRole } from '../model/role.model';
import { RoleService } from '../services/authentication/role.service';
import { Router, UrlTree } from '@angular/router';
import { AUTH_ROUTES } from '../utilities/constant';

@Injectable()
export class PermissionGuard {
  private readonly roleService: RoleService = inject(RoleService);
  private readonly router: Router = inject(Router);

  isOfProfile(role: TRole): boolean | UrlTree {
    return this.roleService.isOfProfile(role) ? true : this.router.parseUrl(`/${AUTH_ROUTES.unauthorized}`);
  }

  hasPermission(permission: TPermissions): boolean | UrlTree {
    return this.roleService.hasPermission(permission) ? true : this.router.parseUrl(`/${AUTH_ROUTES.unauthorized}`);
  }

  hasSomePermissions(permissions: TPermissions[]): boolean | UrlTree {
    return this.roleService.hasSomePermissions(permissions) ? true : this.router.parseUrl(`/${AUTH_ROUTES.unauthorized}`);
  }

}

export const hasRole = (role: TRole, permissionGuard = inject(PermissionGuard)) => permissionGuard.isOfProfile(role);
export const hasPermission = (permission: TPermissions, permissionGuard = inject(PermissionGuard)) => permissionGuard.hasPermission(permission);
export const hasSomePermissions = (permissions: TPermissions[], permissionGuard = inject(PermissionGuard)) => permissionGuard.hasSomePermissions(permissions);
