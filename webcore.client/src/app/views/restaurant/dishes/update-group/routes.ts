import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./update-group.component').then(m => m.UpdateGroupComponent),
    data: {
      title: $localize`Dishes - Update Group`
    }
  }
];

