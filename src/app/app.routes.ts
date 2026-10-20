import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'perfil', loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile) },
  {
    path: 'reservas',
    loadComponent: () => import('./pages/reservation/reservation').then((m) => m.ReservationPage),
  },
];
