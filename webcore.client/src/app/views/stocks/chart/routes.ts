import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chart.component').then(m => m.ChartComponent),
    data: {
      title: $localize`Chart`
    }
  }
];

