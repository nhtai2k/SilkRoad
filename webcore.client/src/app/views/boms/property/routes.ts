import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./property.component').then(m => m.PropertyComponent),
    data: {
      title: $localize`Properties`
    }
  }
];
