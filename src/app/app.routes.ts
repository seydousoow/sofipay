import { Route, Routes, UrlSegment } from '@angular/router';
import { Layout } from './components/shared/layout/layout';
import { AUTH_ROUTES } from './core/utilities/constant';
import { Login } from './components/authentication/login/login';
import { Registration } from './components/authentication/registration/registration';
import { Unauthorized } from './components/authentication/unauthorized';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NotFound } from './components/authentication/not-found';
import { CorporateDashboard } from './components/corporate/dashboard/corporate-dashboard';
import { hasRole } from './core/guards/permission.guard';
import { Logout } from './components/authentication/logout';
import { Redirect } from './components/authentication/redirect';
import { RedirectGuard } from './core/guards/redirect.guard';
import { Offers } from './components/corporate/offers/offers';
import { FollowUp } from './components/corporate/follow-up/follow-up';
import { Billing } from './components/corporate/billing/billing';
import { Geolocation } from './components/corporate/geolocation/geolocation';
import { AdminDashboard } from './components/admin/dashboard/admin-dashboard';

const adminRoutes: Routes = [
  { path: '', component: AdminDashboard },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const customerRoutes: Routes = [];

const corporateRoutes: Routes = [
  { path: 'home', component: CorporateDashboard },
  { path: 'offers', component: Offers },
  { path: 'follow-up', component: FollowUp },
  { path: 'billing', component: Billing },
  { path: 'geolocation', component: Geolocation },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const routes: Routes = [
  { path: AUTH_ROUTES.login, component: Login },
  { path: AUTH_ROUTES.registration, component: Registration },
  { path: AUTH_ROUTES.unauthorized, component: Unauthorized },
  { path: AUTH_ROUTES.notFound, component: NotFound },
  { path: AUTH_ROUTES.logout, component: Logout },
  { path: AUTH_ROUTES.redirect, component: Redirect, canMatch: [(_: Route, segments: UrlSegment[]) => RedirectGuard(_, segments)] },
  {
    path: '',
    component: Layout,
    canMatch: [(_: Route, segments: UrlSegment[]) => AuthenticationGuard(_, segments)],
    children: [
      { path: 'admin', children: adminRoutes, canMatch: [() => hasRole('ADMIN')] },
      { path: 'customer', children: customerRoutes, canMatch: [() => hasRole('CUSTOMER')] },
      { path: 'corporate', children: corporateRoutes, canMatch: [() => hasRole('CORPORATE')] },
      { path: '**', redirectTo: `${AUTH_ROUTES.notFound}`, pathMatch: 'full' }
    ],
  }, { path: '**', redirectTo: '', pathMatch: 'full' }
];
