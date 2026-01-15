import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./handbook.component').then(m => m.HandbookComponent),
    data: {
      title: $localize`Handbook`
    }
  }
];

