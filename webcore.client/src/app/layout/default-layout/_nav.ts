import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Test Component',
  //   url: '/test-component',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  //#region Stock Market
  // {
  //   title: true,
  //   name: 'Stock Market'
  // },
  // {
  //   name: 'Industries',
  //   url: '/stock/industries',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Companies',
  //   url: '/stock/companies',
  //   iconComponent: { name: 'cil-building' }
  // },
  //   {
  //   name: 'Chart',
  //   url: '/stock/chart',
  //   iconComponent: { name: 'cil-bar-chart' }
  // },
  //       {
  //   name: 'Trade Histories',
  //   url: '/stock/chart',
  //   iconComponent: { name: 'cil-notes' }
  // },

  //#endregion
  //#region Features
  {
    title: true,
    name: 'Features'
  },
  // {
  //   name: 'ChatGPT',
  //   url: '/features/chatgpt',
  //   iconComponent: { name: 'cil-baby' }
  // },
  //   {
  //   name: 'Ollama',
  //   url: '/features/ollama',
  //   iconComponent: { name: 'cil-baby' }
  // },
  // {
  //   name: 'Streaming Ollama',
  //   url: '/features/stream-ollama',
  //   iconComponent: { name: 'cil-baby' }
  // },
  {
    name: 'Qr Code',
    url: '/features/qr-code',
    iconComponent: { name: 'cil-qr-code' }
  },
  // {
  //   name: 'Email Service',
  //   url: '/features/email-service',
  //   iconComponent: { name: 'cil-envelope-closed' }
  // },
  //#endregion
  //#region Restaurant
  {
    name: 'Restaurant',
    title: true
  },
  {
    name: 'Reservations',
    url: '/reservations',
    iconComponent: { name: 'cil-calendar' }
  },
  {
    name: 'Categories',
    url: '/categories',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Dishes',
    url: '/dishes',
    iconComponent: { name: 'cil-fastfood' }
  },
  {
    name: 'Tables',
    url: '/tables',
    iconComponent: { name: 'cil-view-module' }
  },
  {
    name: 'Units',
    url: '/units',
    iconComponent: { name: 'cil-line-style' }
  },
  //#endregion
  //#region Lipstick Shop
  {
    title: true,
    name: 'Lipstick Shop'
  },
  {
    name: 'Report',
    url: '/lipstick-shop/report',
    iconComponent: { name: 'cil-chart-line' }
  },
  {
    name: 'Orders',
    url: '/lipstick-shop/orders',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Payments',
    url: '/lipstick-shop/payments',
    iconComponent: { name: 'cil-money' }
  },
  {
    name: 'Products',
    url: '/lipstick-shop/products',
    iconComponent: { name: 'cil3d' }
  },
  {
    name: 'Blogs',
    url: '/lipstick-shop/blogs',
    iconComponent: { name: 'cil-color-border' }
  },
  {
    name: 'Members',
    url: '/lipstick-shop/members',
    iconComponent: { name: 'cil3d' }
  },
  {
    name: 'Extend',
    url: '/lipstick-shop/extension',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Brands',
        url: '/lipstick-shop/extension/brands',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Categories',
        url: '/lipstick-shop/extension/categories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'SubCategories',
        url: '/lipstick-shop/extension/sub-categories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Colors',
        url: '/lipstick-shop/extension/colors',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Sizes',
        url: '/lipstick-shop/extension/sizes',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Topics',
        url: '/lipstick-shop/extension/topics',
        icon: 'nav-icon-bullet'
      },
      {
        name: "Page Types",
        url: '/lipstick-shop/extension/page-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: "Page Contents",
        url: '/lipstick-shop/extension/page-contents',
        icon: 'nav-icon-bullet'
      },
      {
        name: "Page Introductions",
        url: '/lipstick-shop/extension/page-introductions',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Home Banners',
        url: '/lipstick-shop/extension/home-banners',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  //#endregion
  //#region Surveys

  {
    title: true,
    name: 'Surveys'
  },
  {
    name: 'Report',
    url: '/surveys/report',
    iconComponent: { name: 'cil-chart-line' }
  },
  {
    name: 'Survey Results',
    url: '/surveys/survey-results',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Extend',
    url: '/surveys/extension',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      // {
      //   name: 'Question Groups',
      //   url: '/surveys/extension/question-groups',
      //   icon: 'nav-icon-bullet'
      // },
      {
        name: 'Question Types',
        url: '/surveys/extension/question-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'QG Libraries',
        url: '/surveys/extension/question-group-libraries',
        icon: 'nav-icon-bullet'
      }
      // {
      //   name: 'Questions',
      //   url: '/surveys/extension/questions',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Survey Forms',
      //   url: '/surveys/extension/survey-forms',
      //   icon: 'nav-icon-bullet'
      // }
    ]
  },
  //#endregion
  //#region System Management
  {
    name: 'System Management',
    title: true
  },
  {
    name: 'Accounts',
    url: '/accounts',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Logs',
    url: '/logs',
    iconComponent: { name: 'cil-book' }
  },
  {
    name: 'Extend',
    url: '/system-management/extension',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Roles',
        url: '/system-management/extension/roles',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Modules',
        url: '/system-management/extension/modules',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Actions',
        url: '/system-management/extension/actions',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Settings',
        url: '/system-management/extension/settings',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  //#endregion
];
