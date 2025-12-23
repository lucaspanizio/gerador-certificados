import { Component } from '@angular/core';

import { Navbar } from './navbar';

@Component({
  selector: 'app-layout',
  templateUrl: './template.html',
  imports: [Navbar],
})
export class Layout {}
