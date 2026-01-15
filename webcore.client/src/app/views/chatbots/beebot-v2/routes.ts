import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./beebot-v2.component').then(m => m.BeebotV2Component),
    data: {
      title: $localize`Beebot V2`
    }
  }
];

