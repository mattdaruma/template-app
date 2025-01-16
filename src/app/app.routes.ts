import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInCallbackComponent } from './sign-in-callback/sign-in-callback.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { mainResolver } from './main/main.resolver';
import { signInCallbackResolver } from './sign-in-callback/sign-in-callback.resolver';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in'
    },{
        path: 'sign-in',
        component: SignInComponent
    },{
        path: 'sign-in-callback',
        resolve: {token: signInCallbackResolver},
        component: SignInCallbackComponent
    },{
        path: 'main',
        loadComponent: ()=> import('./main/main.component').then(m => m.MainComponent), 
        canActivateChild: [AuthGuard],
        resolve: {main: mainResolver},
        loadChildren: ()=>[{
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./main-home/main-home.component').then(m => m.MainHomeComponent)
        },{
            path: 'section',
            loadComponent: ()=> import('./section/section.component').then(m => m.SectionComponent), 
            resolve: { section: ()=>{ demo: 'Hello!' }},
            loadChildren: ()=>[{
                path: '',
                pathMatch: 'full',
                loadComponent: ()=> import('./section-home/section-home.component').then(m => m.SectionHomeComponent),
            },{
                path: 'view',
                loadComponent: ()=> import('./section-view/section-view.component').then(m => m.SectionViewComponent),
            }]
        }]
    },{
        path: '**',
        component: NotFoundComponent
    }
];
