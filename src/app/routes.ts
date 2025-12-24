import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'certificados',
    pathMatch: 'full',
  },
  {
    path: 'certificados',
    loadComponent: () => import('../pages/certificados').then((m) => m.Certificados),
  },
  {
    path: 'certificados/novo',
    loadComponent: () => import('../pages/form-certificado').then((m) => m.FormCertificado),
  },
  {
    path: 'certificados/:id',
    loadComponent: () => import('../pages/form-certificado').then((m) => m.FormCertificado),
  },
];
