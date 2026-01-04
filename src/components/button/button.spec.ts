import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { Button } from './';

@Component({
  template: `<app-button>Salvar</app-button>`,
  imports: [Button],
})
class HostComponent {}

describe('Button', () => {
  let fixture: ComponentFixture<Button>;
  let component: Button;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Button, HostComponent] }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve renderizar corretamente', () => {
    expect(component).toBeDefined();
  });

  it('deve usar valores padrão', () => {
    expect(component.variant()).toBe('primary');
    expect(component.disabled()).toBe(false);
  });

  it('deve aplicar a classe conforme variant', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('secondary');
  });

  it('deve habilitar e desabilitar o botão conforme a prop disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(button.disabled).toBe(true);

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    button = fixture.nativeElement.querySelector('button');

    expect(button.disabled).toBe(false);
  });

  it('deve renderizar conteúdo interno', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    const button = hostFixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Salvar');
  });
});
