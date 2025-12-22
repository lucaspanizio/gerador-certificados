import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ItemCertificado } from '../components/item-certificado';
import { Navbar } from '../components/navbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, Navbar, ItemCertificado],
})
export class App {
  protected readonly title = signal('gerador-certificados');
}
