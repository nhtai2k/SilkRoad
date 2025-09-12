import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './views/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
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
        path: 'introduction',
        loadChildren: () => import('./views/introduction/routes').then((m) => m.routes)
      },
      // {
      //   path: 'test-component',
      //   loadChildren: () => import('./views/test/routes').then((m) => m.routes)
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      //#region Stock Market
      // {
      //   path: 'stock/industries',
      //   loadChildren: () => import('./views/stocks/industry/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'stock/companies',
      //   loadChildren: () => import('./views/stocks/company/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'stock/chart',
      //   loadChildren: () => import('./views/stocks/chart/routes').then((m) => m.routes)
      // },
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
        path: 'surveys/survey-results',
        loadChildren: () => import('./views/surveys/survey-results/index/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/survey-results/update/:id',
        loadChildren: () => import('./views/surveys/survey-results/details/routes').then((m) => m.routes)
      },
      {
        path: 'surveys/extend-survey',
        loadChildren: () => import('./views/surveys/extend-survey/routes').then((m) => m.routes)
      },
      //#endregion
      //#region System Management
      //account management
      {
        path: 'my-account',
        loadChildren: () => import('./views/sm/my-account/routes').then((m) => m.routes)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./views/sm/accounts/index/routes').then((m) => m.routes)
      },
      {
        path: 'accounts/create',
        loadChildren: () => import('./views/sm/accounts/create/routes').then((m) => m.routes)
      },
      {
        path: 'accounts/update/:id',
        loadChildren: () => import('./views/sm/accounts/update/routes').then((m) => m.routes)
      },
      {
        path: 'logs',
        loadChildren: () => import('./views/sm/logging/routes').then((m) => m.routes)
      },
      {
        path: 'system-management/extension',
        loadChildren: () => import('./views/sm/extension/routes').then((m) => m.routes)
      },


      //#endregion
    ]
  },
    {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '423',
    loadComponent: () => import('./views/pages/page423/page423.component').then(m => m.Page423Component),
    data: {
      title: 'Page 423'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./views/pages/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent),
    data: {
      title: 'Reover Password Page'
    }
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./views/pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    data: {
      title: 'Reset Password Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
