import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {}
