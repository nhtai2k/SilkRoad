import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./three3.component').then(m => m.Three3Component),
    data: {
      title: $localize`Three V1`
    }
  }
];

