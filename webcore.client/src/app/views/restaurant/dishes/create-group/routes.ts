import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-group.component').then(m => m.CreateGroupComponent),
    data: {
      title: $localize`Dishes - Create Group`
    }
  }
];

