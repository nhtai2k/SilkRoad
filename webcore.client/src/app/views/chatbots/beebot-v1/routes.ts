import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./beebot-v1.component').then(m => m.BeebotV1Component),
    data: {
      title: $localize`Beebot V1`
    }
  }
];

