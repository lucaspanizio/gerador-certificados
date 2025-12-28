import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '../../components/button';
import { ItemCertificado } from '../../components/item-certificado';
import { CertificadoService } from '../../services/certificado';
import { Certificado } from '../../interfaces/certificado';

@Component({
  selector: 'app-certificados',
  templateUrl: './template.html',
  imports: [Button, ItemCertificado],
})
export class CertificadosComponent implements OnInit {
  certificados: Certificado[] = [];

  constructor(private certificadoService: CertificadoService, private router: Router) {}

  ngOnInit(): void {
    this.certificados = this.certificadoService.certificados;
  }

  goToGeneratePage(): void {
    this.router.navigate(['/certificados/novo']);
  }
}
