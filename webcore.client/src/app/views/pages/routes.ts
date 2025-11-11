import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
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
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path:'survey-form/:id',
    loadComponent: () => import('./survey-form/survey-form.component').then(m => m.SurveyFormComponent),
    data: {
      title: 'Survey Form'
    }
  },
  {
    path:'gold-survey-form/:id',
    loadComponent: () => import('./gold-survey-form/gold-survey-form.component').then(m => m.GoldSurveyFormComponent),
    data: {
      title: 'Gold Survey Form'
    }
  },
  {
    path:'gold-thank-you',
    loadComponent: () => import('./gold-thank-you/gold-thank-you.component').then(m => m.GoldThankYouComponent),
    data: {
      title: 'Thank you'
    }
  },
  {
    path:'gold-finish/:id',
    loadComponent: () => import('./gold-finish/gold-finish.component').then(m => m.GoldFinishComponent),
    data: {
      title: 'Finish'
    }
  }
];
