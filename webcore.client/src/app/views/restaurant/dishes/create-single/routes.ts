import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-single.component').then(m => m.CreateSingleComponent),
    data: {
      title: $localize`Dishes - Create Single`
    }
  }
];

