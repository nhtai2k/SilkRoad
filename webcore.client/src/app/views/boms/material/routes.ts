import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./material.component').then(m => m.MaterialComponent),
    data: {
      title: $localize`Materials`
    }
  }
];
