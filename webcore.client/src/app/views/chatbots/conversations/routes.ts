import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conversations.component').then(m => m.ConversationsComponent),
    data: {
      title: $localize`Conversations`
    }
  }
];

