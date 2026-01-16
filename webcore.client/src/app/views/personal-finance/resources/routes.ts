import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./resources.component').then(m => m.ResourcesComponent),
    data: {
      title: $localize`Resources`
    }
  }
];

