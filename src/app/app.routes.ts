import { Route, Routes, UrlSegment } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AUTH_ROUTES } from './core/utilities/constant';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { UnauthorizedComponent } from './components/authentication/unauthorized.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NotFoundComponent } from './components/authentication/not-found.component';
import { CorporateDashboardComponent } from './components/corporate/dashboard/corporate-dashboard.component';
import { hasRole } from './core/guards/permission.guard';
import { LogoutComponent } from './components/authentication/logout.component';
import { RedirectComponent } from './components/authentication/redirect.component';
import { RedirectGuard } from './core/guards/redirect.guard';
import { OffersComponent } from './components/corporate/offers/offers.component';
import { FollowUpComponent } from './components/corporate/follow-up/follow-up.component';
import { BillingComponent } from './components/corporate/billing/billing.component';
import { GeolocationComponent } from './components/corporate/geolocation/geolocation.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const customerRoutes: Routes = [];

const corporateRoutes: Routes = [
  { path: 'home', component: CorporateDashboardComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'follow-up', component: FollowUpComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'geolocation', component: GeolocationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const routes: Routes = [
  { path: AUTH_ROUTES.login, component: LoginComponent },
  { path: AUTH_ROUTES.registration, component: RegistrationComponent },
  { path: AUTH_ROUTES.unauthorized, component: UnauthorizedComponent },
  { path: AUTH_ROUTES.notFound, component: NotFoundComponent },
  { path: AUTH_ROUTES.logout, component: LogoutComponent },
  { path: AUTH_ROUTES.redirect, component: RedirectComponent, canMatch: [(_: Route, segments: UrlSegment[]) => RedirectGuard(_, segments)] },
  {
    path: '',
    component: LayoutComponent,
    canMatch: [(_: Route, segments: UrlSegment[]) => AuthenticationGuard(_, segments)],
    children: [
      { path: 'admin', children: adminRoutes, canMatch: [() => hasRole('ADMIN')] },
      { path: 'customer', children: customerRoutes, canMatch: [() => hasRole('CUSTOMER')] },
      { path: 'corporate', children: corporateRoutes, canMatch: [() => hasRole('CORPORATE')] },
      { path: '**', redirectTo: `${AUTH_ROUTES.notFound}`, pathMatch: 'full' }
    ],
  }, { path: '**', redirectTo: '', pathMatch: 'full' }
];
