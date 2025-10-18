import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./dashboard/dashboard').then(c => c.DashboardComponent) },
    { path: 'detail', loadComponent: () => import('./detail/detail').then(c => c.DetailComponent) },
];
