import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './views/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticationGuard } from './core/guards/authentication.guard';
import { pageRoutes } from './views/pages/routes';
export const routes: Routes = [
  ...pageRoutes, 
  {
    path: '',
    //redirectTo: 'dashboard',
    component: LoginComponent,
    //pathMatch: 'full'
    canActivate: [authGuard],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authenticationGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'test',
        loadChildren: () => import('./views/test/routes').then((m) => m.routes)
      },
      {
        path: 'introduction',
        loadChildren: () => import('./views/introduction/routes').then((m) => m.routes)
      },
      {
        path: 'test-component',
        loadChildren: () => import('./views/test/routes').then((m) => m.routes)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      //#region Stock Market
      {
        path: 'stock/industries',
        loadChildren: () => import('./views/stocks/industry/routes').then((m) => m.routes)
      },
      {
        path: 'stock/companies',
        loadChildren: () => import('./views/stocks/company/routes').then((m) => m.routes)
      },
      {
        path: 'stock/chart',
        loadChildren: () => import('./views/stocks/chart/routes').then((m) => m.routes)
      },
      //#endregion
      
      //#region Personal Finance
      {
        path: 'personal-finance/categories',
        loadChildren: () => import('./views/personal-finance/categories/routes').then((m) => m.routes)
      },
      {
        path: 'personal-finance/expenses',
        loadChildren: () => import('./views/personal-finance/expenses/routes').then((m) => m.routes)
      },
      {
        path: 'personal-finance/income',
        loadChildren: () => import('./views/personal-finance/income/routes').then((m) => m.routes)
      },
      {
        path: 'personal-finance/reports',
        loadChildren: () => import('./views/personal-finance/reports/routes').then((m) => m.routes)
      },
      //#endregion

      //#region Features
      // {
      //   path: 'features/chatgpt',
      //  loadChildren: () => import('./views/features/gpt/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'features/ollama',
      //   loadChildren: () => import('./views/features/ollama/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'features/stream-ollama',
      //   loadChildren: () => import('./views/features/stream-ollama/routes').then((m) => m.routes)
      // },
      {
        path: 'features/qr-code',
        loadChildren: () => import('./views/features/qr-code/routes').then((m) => m.routes)
      },
      {
        path: 'features/convert-word-to-pdf',
        loadChildren: () => import('./views/features/convert-word-to-pdf/routes').then((m) => m.routes)
      },
      // {
      //   path: 'features/email-service',
      //   loadChildren: () => import('./views/features/email-service/routes').then((m) => m.routes)
      // },
      //#endregion
      
      //#region Lipstick
      // Report
      {
        path: 'lipstick-shop/report',
        loadChildren: () => import('./views/lipstick-shop/report/routes').then((m) => m.routes)
      },
      //orders
      {
        path: 'lipstick-shop/orders',
        loadChildren: () => import('./views/lipstick-shop/orders/index/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/orders/create',
        loadChildren: () => import('./views/lipstick-shop/orders/create/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/orders/update/:id',
        loadChildren: () => import('./views/lipstick-shop/orders/update/routes').then((m) => m.routes)
      },
      //payments
      {
        path: 'lipstick-shop/payments',
        loadChildren: () => import('./views/lipstick-shop/payments/routes').then((m) => m.routes)
      },
      //products
      {
        path: 'lipstick-shop/products',
        loadChildren: () => import('./views/lipstick-shop/products/index/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/products/create',
        loadChildren: () => import('./views/lipstick-shop/products/create/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/products/update/:id',
        loadChildren: () => import('./views/lipstick-shop/products/update/routes').then((m) => m.routes)
      },
      //blogs
      {
        path: 'lipstick-shop/blogs',
        loadChildren: () => import('./views/lipstick-shop/blogs/index/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/blogs/create',
        loadChildren: () => import('./views/lipstick-shop/blogs/create/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/blogs/update/:id',
        loadChildren: () => import('./views/lipstick-shop/blogs/update/routes').then((m) => m.routes)
      },
      {
        path: 'lipstick-shop/extension',
        loadChildren: () => import('./views/lipstick-shop/extension/routes').then((m) => m.routes)
      },
      //members
      {
        path: 'lipstick-shop/members',
        loadChildren: () => import('./views/lipstick-shop/members/routes').then((m) => m.routes)
      },
      //#endregion
      
      //#region Surveys
      {
        path: 'surveys/reports',
        loadChildren: () => import('./views/surveys/report/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/participants',
        loadChildren: () => import('./views/surveys/participants/index/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/participants/details/:id',
        loadChildren: () => import('./views/surveys/participants/details/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/survey-forms',
        loadChildren: () => import('./views/surveys/survey-forms/index/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/survey-forms/create',
        loadChildren: () => import('./views/surveys/survey-forms/create/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/survey-forms/update/:id',
        loadChildren: () => import('./views/surveys/survey-forms/update/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/extension',
        loadChildren: () => import('./views/surveys/extension/routes').then((m) => m.routes)
      },
      //#endregion
      
      //#region System Management
      //account management
      {
        path: 'my-account',
        loadChildren: () => import('./views/system/my-account/routes').then((m) => m.routes)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/system/users/routes').then((m) => m.routes)
      },
      // {
      //   path: 'accounts',
      //   loadChildren: () => import('./views/system/accounts/index/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'accounts/create',
      //   loadChildren: () => import('./views/system/accounts/create/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'accounts/update/:id',
      //   loadChildren: () => import('./views/system/accounts/update/routes').then((m) => m.routes)
      // },
      {
        path: 'logs',
        loadChildren: () => import('./views/system/logging/routes').then((m) => m.routes)
      },
      // {
      //   path: 'system-management/extension',
      //   loadChildren: () => import('./views/system/extension/routes').then((m) => m.routes)
      // },
      //#endregion
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];