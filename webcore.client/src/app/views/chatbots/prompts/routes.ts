import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./prompts.component').then(m => m.PromptsComponent),
    data: {
      title: $localize`Prompts`
    }
  }
];

