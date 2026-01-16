import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Extend'
    },
    children: [
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent),
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'resource-types',
        loadComponent: () => import('./resource-types/resource-types.component').then(m => m.ResourceTypesComponent),
        data: {
          title: 'Resource Types'
        }
      }
    ]
  }
];


