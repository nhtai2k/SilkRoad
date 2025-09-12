import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reservations.component').then(m => m.ReservationsComponent),
    data: {
      title: $localize`Dashboard`
    }
  }
];

