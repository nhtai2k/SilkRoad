import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./income.component').then(m => m.IncomeComponent),
    data: {
      title: $localize`Income`
    }
  }
];

