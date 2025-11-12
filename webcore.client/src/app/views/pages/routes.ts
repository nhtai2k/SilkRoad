import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '423',
    loadComponent: () => import('./page423/page423.component').then(m => m.Page423Component),
    data: {
      title: 'Page 423'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./recover-password/recover-password.component').then(m => m.RecoverPasswordComponent),
    data: {
      title: 'Reover Password Page'
    }
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'review-form/:id',
    loadComponent: () => import('./form-styles/review-form/review-form.component').then(m => m.ReviewFormComponent),
    data: {
      title: 'Review Form'
    }
  },
  {
    path: 'default/:id',
    loadComponent: () => import('./form-styles/default/default.component').then(m => m.DefaultComponent),
    data: {
      title: 'Default Form'
    }
  },
    {
    path:'gold-survey-form/:id',
    loadComponent: () => import('./form-styles/gold-form/gold-survey-form.component').then(m => m.GoldSurveyFormComponent),
    data: {
      title: 'Gold Survey Form'
    }
  },
    {
    path:'gold-thank-you',
    loadComponent: () => import('./form-styles/gold-form/gold-thank-you.component').then(m => m.GoldThankYouComponent),
    data: {
      title: 'Thank you'
    }
  },
    {
    path:'gold-finish/:id',
    loadComponent: () => import('./form-styles/gold-form/gold-finish.component').then(m => m.GoldFinishComponent),
    data: {
      title: 'Finish'
    }
  },
    {
    path: 'test-component',
    loadComponent: () => import('./test/test.component').then(m => m.TestComponent),
    data: {
      title: 'Test Component'
    }
  },
];
