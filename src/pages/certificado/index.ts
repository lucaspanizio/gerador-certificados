import { Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toPng } from 'html-to-image';

import { CertificadoService } from '../../services/certificado';
import { Certificado } from '../../interfaces/certificado';
import { Button } from '../../components/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificado',
  templateUrl: './template.html',
  styleUrls: ['./print.css'],
  imports: [Button, RouterLink, DatePipe],
})
export class CertificadoComponent implements OnInit {
  @Input() data!: Certificado;

  id!: string;
  atividades: string = '';
  downloading = false;

  constructor(
    private certificadoService: CertificadoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  @ViewChild('printRootRef') printRootRef!: ElementRef;

  ngOnInit(): void {
    const certificado = this.certificadoService.getCertificadoById(this.id);
    if (!certificado) {
      this.router.navigate(['/']);
      return;
    }
    this.data = certificado;
    this.atividades = certificado.atividades.join(', ');
  }

  async download() {
    if (this.downloading) return;
    this.downloading = true;
    this.cdr.detectChanges();

    const original = this.printRootRef?.nativeElement;
    if (!original) {
      this.downloading = false;
      return;
    }

    const clone = original.cloneNode(true) as HTMLElement;
    clone.classList.add('print');

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-10000px';

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    await toPng(clone, { cacheBust: true, pixelRatio: 1.55 }) // 1240x852
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `certificado-${this.data.nome.toLocaleLowerCase().replace(/ /g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Erro ao gerar o certificado:', err))
      .finally(() => {
        document.body.removeChild(wrapper);
        this.downloading = false;
        this.cdr.detectChanges();
      });
  }
}
