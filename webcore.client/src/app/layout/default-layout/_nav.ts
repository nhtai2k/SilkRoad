import { INavData } from '@coreui/angular';

const featureNavItems: INavData[] = [
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
  {
    name: 'Convert Word to PDF',
    url: '/features/convert-word-to-pdf',
    iconComponent: { name: 'cil-file' }
  },
  // {
  //   name: 'Email Service',
  //   url: '/features/email-service',
  //   iconComponent: { name: 'cil-envelope-closed' }
  // },
  //#endregion

];

const stockMarketNavItems: INavData[] = [
  //#region Stock Market
  {
    title: true,
    name: 'Stock Market'
  },
  {
    name: 'Industries',
    url: '/stock/industries',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Companies',
    url: '/stock/companies',
    iconComponent: { name: 'cil-building' }
  },
  {
    name: 'Chart',
    url: '/stock/chart',
    iconComponent: { name: 'cil-bar-chart' }
  },
  {
    name: 'Trade Histories',
    url: '/stock/trade-histories',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Handbook',
    url: '/stock/handbook',
    iconComponent: { name: 'cil-book' }
  },
  {
    name: 'Trading Bot',
    url: '/stock/trading-bot',
    iconComponent: { name: 'cil-baby' }
  }
  //#endregion

];

const personalFinanceNavItems: INavData[] = [
  //#region Personal Finance
  {
    title: true,
    name: 'Personal Finance'
  },
  {
    name: 'Reports',
    url: '/personal-finance/reports',
    iconComponent: { name: 'cil-speedometer' }
  },
    {
    name: 'Resources',
    url: '/personal-finance/resources',
    iconComponent: { name: 'cil-bar-chart' }
  },
  {
    name: 'Assets',
    url: '/personal-finance/assets',
    iconComponent: { name: 'cil-library-building' }
  },
  {
    name: 'Expenses',
    url: '/personal-finance/expenses',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Extend',
    url: '/personal-finance/extensions',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Categories',
        url: '/personal-finance/extensions/categories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Resource Types',
        url: '/personal-finance/extensions/resource-types',
        icon: 'nav-icon-bullet'
      },
         {
        name: 'Asset Types',
        url: '/personal-finance/extensions/asset-types',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  //#endregion

];

const restuarantNavItems: INavData[] = [
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

];

const lipstickShopNavItems: INavData[] = [
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

];

const surveyNavItems: INavData[] = [
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
    name: 'Participants',
    url: '/surveys/participants',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Survey Forms',
    url: '/surveys/survey-forms',
    iconComponent: { name: 'cil-file' }
  },
  {
    name: 'Extend',
    url: '/surveys/extension',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Question Types',
        url: '/surveys/extension/question-types',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Stores',
        url: '/surveys/extension/stores',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'QG Libraries',
        url: '/surveys/extension/question-group-libraries',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Question Libraries',
        url: '/surveys/extension/question-libraries',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  //#endregion

];

const bomNavItems: INavData[] = [
    {
    name: 'Bill of Materials',
    title: true
  },
  {
    name: 'Report',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'BOM Structure',
    url: '/boms',
    iconComponent: { name: 'cil-book' }
  },
  {
    name: 'Properties',
    url: '/properties',
    iconComponent: { name: 'cil-line-weight' }
  },
  {
    name: 'Materials',
    url: '/materials',
    iconComponent: { name: 'cil-line-style' }
  },
  {
    name: 'Extend',
    url: '/boms/extensions',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Config Categories',
        url: '/boms/extensions/bom-configurations',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Material Groups',
        url: '/boms/extensions/material-groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Material Categories',
        url: '/boms/extensions/material-categories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Unit Groups',
        url: '/boms/extensions/unit-groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Kitchens',
        url: '/boms/extensions/kitchens',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Ranks',
        url: '/boms/extensions/ranks',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Departments',
        url: '/boms/extensions/departments',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Dish Groups',
        url: '/boms/extensions/dish-groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Dishes',
        url: '/boms/extensions/dishes',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Energies',
        url: '/boms/extensions/energies',
        icon: 'nav-icon-bullet'
      }
    ]
  },
];

const systemNavItems: INavData[] = [
  //#region System Management
  {
    name: 'System',
    title: true
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-people' }
  },
  // {
  //   name: 'Logs',
  //   url: '/logs',
  //   iconComponent: { name: 'cil-book' }
  // },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' }
  },
  // {
  //   name: 'Extend',
  //   url: '/system-management/extension',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Roles',
  //       url: '/system-management/extension/roles',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modules',
  //       url: '/system-management/extension/modules',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Actions',
  //       url: '/system-management/extension/actions',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Settings',
  //       url: '/system-management/extension/settings',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  //#endregion
];

const testNavItems: INavData[] = [
    {
    name: 'Test Component',
    url: '/test',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  }
];

const mindMapNavItems: INavData[] = [
  //#region Mind Maps
  {
    title: true,
    name: 'Mind Map'
  },
  {
    name: 'Mind Maps',
    url: '/mind-maps',
    iconComponent: { name: 'cil-vector' }
  },
  //#endregion
];

const chatbotNavItems: INavData[] = [
  //#region Chat Bot
    {
    name: 'Chat Bot',
    title: true
  },
  // {
  //   name: 'Beebot',
  //   url: '/beebot',
  //   iconComponent: { name: 'cil-speedometer' }
  // },
    {
    name: 'prompts',
    url: '/prompts',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Conversations',
    url: '/conversations',
    iconComponent: { name: 'cil-chat-bubble' }
  },
  //#endregion
];

export const navItems: INavData[] = [
  ...mindMapNavItems,
  ...featureNavItems,
  ...stockMarketNavItems,
  ...personalFinanceNavItems,
  ...chatbotNavItems,
  ...restuarantNavItems,
  ...lipstickShopNavItems,
  ...surveyNavItems,
  ...bomNavItems,
  ...systemNavItems
];
