import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./three5.component').then(m => m.Three5Component),
    data: {
      title: $localize`Three V1`
    }
  }
];

