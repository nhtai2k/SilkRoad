import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-material.component').then(m => m.CreateMaterialComponent),
    data: {
      title: $localize`Materials - Create`
    }
  }
];
