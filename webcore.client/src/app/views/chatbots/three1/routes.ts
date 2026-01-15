import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./three1.component').then(m => m.Three1Component),
    data: {
      title: $localize`Three V1`
    }
  }
];

