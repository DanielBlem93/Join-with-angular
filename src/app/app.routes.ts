import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './login/sing-up/sing-up.component';
import { PanelComponent } from './panel/panel.component';
import { LegalNoticeComponent } from './panel/legal-notice/legal-notice.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'singUp', component: SingUpComponent },
    { path: 'panel/summary', component: PanelComponent },
    { path: 'panel/board', component: PanelComponent },
    { path: 'panel/add-task', component: PanelComponent },
    { path: 'panel/contacts', component: PanelComponent },
    { path: 'panel/legal-notice', component: PanelComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'panel/help', component: PanelComponent },
];
