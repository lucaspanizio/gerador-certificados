import { Component, signal } from '@angular/core';

import { ItemCertificado } from '../components/item-certificado';
import { Layout } from '../components/layout';

@Component({
  selector: 'app-root',
  templateUrl: './template.html',
  imports: [Layout, ItemCertificado],
})
export class App {
  protected readonly title = signal('gerador-certificados');
}
