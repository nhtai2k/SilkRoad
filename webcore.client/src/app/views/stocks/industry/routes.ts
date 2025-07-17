import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./industry.component').then(m => m.IndustryComponent),
    data: {
      title: $localize`Industries`
    }
  }
];

