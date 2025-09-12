import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./units.component').then(m => m.UnitsComponent),
    data: {
      title: $localize`Units`
    }
  }
];
