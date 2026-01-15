import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./trading-bot.component').then(m => m.TradingBotComponent),
    data: {
      title: $localize`Trading Bot`
    }
  }
];

