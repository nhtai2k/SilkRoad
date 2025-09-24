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
        redirectTo: 'question-types',
        pathMatch: 'full'
      },
      {
        path: 'question-types',
        loadComponent: () => import('./question-types/question-types.component').then(m => m.QuestionTypesComponent),
        data: {
          title: 'Question types'
        }
      },
      {
        path: 'question-group-libraries',
        loadComponent: () => import('./question-group-libraries/question-group-libraries.component').then(m => m.QuestionGroupLibrariesComponent),
        data: {
          title: 'Question Group Libraries'
        }
      },
      {
        path: 'question-libraries',
        loadComponent: () => import('./question-libraries/index/index.component').then(m => m.IndexComponent),
        data: {
          title: 'Question Libraries'
        }
      },
      {
        path: 'question-libraries/create',
        loadComponent: () => import('./question-libraries/create/create.component').then(m => m.CreateComponent),
        data: {
          title: 'Create Question Library'
        }
      },
      {
        path: 'question-libraries/update/:id',
        loadComponent: () => import('./question-libraries/update/update.component').then(m => m.UpdateComponent),
        data: {
          title: 'Update Question Library'
        }
      }
      // {
      //   path: 'survey-forms',
      //   loadComponent: () => import('./survey-forms/index/index.component').then(m => m.IndexComponent),
      //   data: {
      //     title: 'Survey Forms'
      //   }
      // },
      // {
      //   path: 'survey-forms/create',
      //   loadComponent: () => import('./survey-forms/create/create.component').then(m => m.CreateComponent),
      //   data: {
      //     title: 'Create Survey Form'
      //   }
      // },
      // {
      //   path: 'survey-forms/update/:id',
      //   loadComponent: () => import('./survey-forms/update/update.component').then(m => m.UpdateComponent),
      //   data: {
      //     title: 'Update Survey Form'
      //   }
      // }

    ]
  }
];


