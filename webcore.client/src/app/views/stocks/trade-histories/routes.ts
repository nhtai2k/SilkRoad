import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./trade-histories.component').then(m => m.TradeHistoriesComponent),
    data: {
      title: $localize`Trade Histories`
    }
  }
];

