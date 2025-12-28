import { FormsModule, NgModel } from '@angular/forms';
import { Component } from '@angular/core';

import { Button } from '../../components/button';

@Component({
  selector: 'app-form-certificado',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [Button, FormsModule],
})
export class FormCertificado {
  name: string = '';
  activity: string = '';

  activities: string[] = ['Atividade 1', 'Atividade 2', 'Atividade 3'];
  isDuplicatedActivity: boolean = false;

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
}
