import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './template.html',
  styleUrl: './styles.css',
  imports: [],
})
export class Button {
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input(false);

  @HostBinding('class')
  get classes() {
    return this.variant();
  }
}
