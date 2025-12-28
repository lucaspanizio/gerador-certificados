import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { CertificadoService } from '../../services/certificado';
import { Certificado } from '../../interfaces/certificado';
import { Button } from '../../components/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificado',
  templateUrl: './template.html',
  imports: [Button, RouterLink, DatePipe],
})
export class CertificadoComponent implements OnInit {
  @Input() data!: Certificado;
  id!: string;

  constructor(
    private certificadoService: CertificadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    const certificado = this.certificadoService.getCertificadoById(this.id);
    if (!certificado) {
      this.router.navigate(['/']);
      return;
    }
    this.data = certificado;
  }
}
