import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./components/user-form/user-form.component').then((m) => m.UserFormComponent),
  },
  {
    path: 'signal-form',
    loadComponent: () =>
      import('./components/signal-form/signal-form.component').then((m) => m.SignalFormComponent),
  },
];
