import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./details.component').then(m => m.DetailsComponent),
    data: {
      title: $localize`Report`
    }
  }
];

