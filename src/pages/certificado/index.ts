import { Component } from '@angular/core';

import { Button } from '../../components/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-certificado',
  templateUrl: './template.html',
  imports: [Button, RouterLink],
})
export class Certificado {
  id!: string;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
