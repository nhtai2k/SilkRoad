import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./update-material.component').then(m => m.UpdateMaterialComponent),
    data: {
      title: $localize`Materials - Update`
    }
  }
];
