import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '../components/layout';
import { CertificadoService } from '../services/certificado';

@Component({
  selector: 'app-root',
  templateUrl: './template.html',
  imports: [Layout, RouterOutlet],
})
export class App implements OnInit {
  protected readonly title = signal('gerador-certificados');

  constructor(private certificadoService: CertificadoService) {}

  ngOnInit(): void {
    const certificados = localStorage.getItem('certificados');
    this.certificadoService.certificados = certificados ? JSON.parse(certificados) : [];
  }
}
