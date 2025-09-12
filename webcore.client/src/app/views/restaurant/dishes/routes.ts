import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dishes.component').then(m => m.DishesComponent),
    data: {
      title: $localize`Dishes`
    }
  }
];

