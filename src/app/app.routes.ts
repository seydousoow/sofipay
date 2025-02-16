import { Routes } from '@angular/router';

const flightRoutes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routes: Routes = [
  { path: 'flights', children: flightRoutes },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
