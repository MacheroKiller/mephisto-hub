import { Route } from '@angular/router';
import { Board } from './features/board/board';
import { authGuard } from './core/auth/auth.guard';
import { Login } from './features/login/login';
import { AuthenticatedLayout } from './core/layout/authenticated-layout';

export const appRoutes: Route[] = [
  { path: 'login', component: Login },
  {
    path: '',
    component: AuthenticatedLayout,
    canActivate: [authGuard],
    children: [{ path: '', component: Board }],
  },
];
