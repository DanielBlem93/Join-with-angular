import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './login/sing-up/sing-up.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'singUp', component: SingUpComponent },
];
