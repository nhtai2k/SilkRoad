import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./three2.component').then(m => m.Three2Component),
    data: {
      title: $localize`Three V1`
    }
  }
];

