import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'certificados',
    pathMatch: 'full',
  },
  {
    path: 'certificados',
    loadComponent: () => import('../pages/certificados').then((m) => m.CertificadosComponent),
  },
  {
    path: 'certificados/novo',
    loadComponent: () =>
      import('../pages/form-certificado').then((m) => m.FormCertificadoComponent),
  },
  {
    path: 'certificados/:id',
    loadComponent: () => import('../pages/certificado').then((m) => m.CertificadoComponent),
  },
];
