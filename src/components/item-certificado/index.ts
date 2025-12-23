import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { Button } from '../button';

@Component({
  selector: 'app-item-certificado',
  templateUrl: './template.html',
  imports: [Button, RouterLink],
  host: {
    class: 'w-full last:[&_.card]:mb-0',
  },
})
export class ItemCertificado {
  id: string = '5';
}
