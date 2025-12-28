import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Certificado } from '../../interfaces/certificado';
import { Button } from '../button';

@Component({
  selector: 'app-item-certificado',
  templateUrl: './template.html',
  imports: [Button, RouterLink, DatePipe],
  host: {
    class: 'w-full last:[&_.card]:mb-0',
  },
})
export class ItemCertificado {
  @Input() data!: Certificado;
}
