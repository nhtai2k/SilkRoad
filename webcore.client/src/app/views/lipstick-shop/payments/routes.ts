import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./payments.component').then(m => m.PaymentsComponent),
    data: {
      title: $localize`Payments`
    }
  }
];

