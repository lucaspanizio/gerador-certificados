import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '../components/layout';

@Component({
  selector: 'app-root',
  templateUrl: './template.html',
  imports: [Layout, RouterOutlet],
})
export class App {
  protected readonly title = signal('gerador-certificados');
}
