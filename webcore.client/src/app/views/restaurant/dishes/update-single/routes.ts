import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./update-single.component').then(m => m.UpdateSingleComponent),
    data: {
      title: $localize`Dishes - Update Single`
    }
  }
];

