import { Component, input } from '@angular/core';

import { Button } from '../../components/button';
import { ItemCertificado } from '../../components/item-certificado';

@Component({
  selector: 'app-certificados',
  templateUrl: './template.html',
  imports: [Button, ItemCertificado],
})
export class Certificados {
  certificados = input([1]);
}
