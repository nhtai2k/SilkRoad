import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view.component').then(m => m.ViewComponent),
    data: {
      title: $localize`Accounts / View`
    }
  }
];
