import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./members.component').then(m => m.MembersComponent),
    data: {
      title: $localize`Members`
    }
  }
];

