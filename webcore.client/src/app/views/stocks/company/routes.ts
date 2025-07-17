import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./company.component').then(m => m.CompanyComponent),
    data: {
      title: $localize`Companies`
    }
  }
];

