import { Component, HostBinding, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './template.html',
  styleUrl: './styles.css',
})
export class Button {
  variant = input<'primary' | 'secondary'>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);

  @HostBinding('attr.disabled')
  get disabledAttr() {
    return this.disabled() ? '' : null;
  }

  @HostBinding('class')
  get classes() {
    return this.variant();
  }
}
