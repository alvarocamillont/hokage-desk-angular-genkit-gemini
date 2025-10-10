import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { DetailComponent } from './detail/detail';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'detail', component: DetailComponent },
];
