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
                redirectTo: 'bom-configurations',
                pathMatch: 'full'
            },
            {
                path: 'bom-configurations',
                loadComponent: () => import('./bom-configuration/bom-configuration.component').then(m => m.BomConfigurationComponent),
                data: {
                    title: 'BOM Configurations'
                }
            },
            {
                path: 'material-groups',
                loadComponent: () => import('./material-group/material-group.component').then(m => m.MaterialGroupComponent),
                data: {
                    title: 'Material Groups'
                }
            },
            {
                path: 'material-categories',
                loadComponent: () => import('./material-category/material-category.component').then(m => m.MaterialCategoryComponent),
                data: {
                    title: 'Material Categories'
                }
            },
            {
                path: 'property-types',
                loadComponent: () => import('./property-type/property-type.component').then(m => m.PropertyTypeComponent),
                data: {
                    title: 'Property Types'
                }
            },
            // {
            //     path: 'units',
            //     loadComponent: () => import('./unit/unit.component').then(m => m.UnitComponent),
            //     data: {
            //         title: 'Units'
            //     }
            // },
            {
                path: 'unit-groups',
                loadComponent: () => import('./unit-group/unit-group.component').then(m => m.UnitGroupComponent),
                data: {
                    title: 'Units'
                }
            },
            {
                path: 'energies',
                loadComponent: () => import('./energy/energy.component').then(m => m.EnergyComponent),
                data: {
                    title: 'Energies'
                }
            },
            {
                path: 'kitchens',
                loadComponent: () => import('./kitchen/kitchen.component').then(m => m.KitchenComponent),
                data: {
                    title: 'Kitchens'
                }
            },
            // {
            //     path: 'employees',
            //     loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent),
            //     data: {
            //         title: 'Employees'
            //     }
            // },
            {
                path: 'ranks',
                loadComponent: () => import('./rank/rank.component').then(m => m.RankComponent),
                data: {
                    title: 'Ranks'
                }
            },
            {
                path: 'departments',
                loadComponent: () => import('./department/department.component').then(m => m.DepartmentComponent),
                data: {
                    title: 'Departments'
                }
            },
            {
                path: 'procedures',
                loadComponent: () => import('./procedure/procedure.component').then(m => m.ProcedureComponent),
                data: {
                    title: 'procedures'
                }
            },
            // {
            //     path: 'malls',
            //     loadComponent: () => import('./mall/mall.component').then(m => m.MallComponent),
            //     data: {
            //         title: 'Malls'
            //     }
            // },
            {
                path: 'dishes',
                loadComponent: () => import('./dish/dish.component').then(m => m.DishComponent),
                data: {
                    title: 'Dishes'
                }
            },
            {
                path: 'dish-groups',
                loadComponent: () => import('./dish-group/dish-group.component').then(m => m.DishGroupComponent),
                data: {
                    title: 'Dish Groups'
                }
            }
        ]
    }
];


