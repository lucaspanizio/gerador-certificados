import { Component } from '@angular/core';
import { Button } from '../../components/button';

@Component({
  selector: 'app-form-certificado',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [Button],
})
export class FormCertificado {
  atividades = ['Atividade 1', 'Atividade 2', 'Atividade 3'];
}
