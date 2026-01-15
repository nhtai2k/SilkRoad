import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./three4.component').then(m => m.Three4Component),
    data: {
      title: $localize`Three V1`
    }
  }
];

