import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { Navbar } from '../navbar';

@Component({
  selector: 'app-layout',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [RouterOutlet, Navbar],
})
export class Layout {}
