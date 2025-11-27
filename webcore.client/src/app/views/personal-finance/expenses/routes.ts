import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./expenses.component').then(m => m.ExpensesComponent),
    data: {
      title: $localize`Expenses`
    }
  }
];

