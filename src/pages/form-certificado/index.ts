import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { Button } from '../../components/button';
import { CertificadoService } from '../../services/certificado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-certificado',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [Button, FormsModule],
})
export class FormCertificadoComponent {
  name: string = '';
  activity: string = '';

  activities: string[] = [];
  isDuplicatedActivity: boolean = false;

  constructor(private certificadoService: CertificadoService, private router: Router) {}

  addActivity() {
    const value = this.activity.trim();
    if (!value) return;

    const alreadyExists = this.activities.some((a) => a.toLowerCase() === value.toLowerCase());

    if (alreadyExists) {
      this.isDuplicatedActivity = true;
      return;
    }

    this.activities.push(value);
    this.isDuplicatedActivity = false;
    this.activity = '';
  }

  removeActivity(index: number) {
    this.activities.splice(index, 1);
  }

  isInvalidForm() {
    return this.name?.trim().length === 0 || this.activities?.length === 0;
  }

  submit() {
    if (this.isInvalidForm()) return;

    const novoCertificado = {
      id: crypto.randomUUID(),
      nome: this.name,
      atividades: this.activities,
      dataEmissao: Date.now(),
    };

    this.certificadoService.addCertificado(novoCertificado);
    this.router.navigate(['/certificados', novoCertificado.id]);
  }
}
