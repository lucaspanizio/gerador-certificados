import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

import { CertificadoComponent } from './../../pages/certificado/index';
import { Certificado } from './../../interfaces/certificado';

import { ItemCertificado } from './';

const certificadoMock = {
  id: '123',
  nome: 'Jhon Doe',
  dataEmissao: new Date('2024-01-01T10:30:00-03:00').getTime(),
} satisfies Omit<Certificado, 'atividades'>;

describe('ItemCertificado', () => {
  let fixture: ComponentFixture<ItemCertificado>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCertificado],
      providers: [provideRouter([{ path: 'certificados/:id', component: CertificadoComponent }])],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ItemCertificado);
  });

  it('deve renderizar o componente', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('deve renderizar corretamente o conteúdo do certificado', () => {
    fixture.componentRef.setInput('data', certificadoMock);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;

    // estrutura
    expect(element.querySelector('li')).not.toBeNull();

    // texto
    expect(element.textContent).toContain('Jhon Doe');
    expect(element.textContent).toContain('01/01/2024 às 10:30');

    // botão
    const button = element.querySelector('app-button');
    expect(button).not.toBeNull();
    expect(button!.textContent).toContain('Ver');
  });

  it('deve levar para o certificado ao clicar no botão', async () => {
    fixture.componentRef.setInput('data', certificadoMock);
    fixture.detectChanges();

    await router.navigate(['/certificados', certificadoMock.id]);

    expect(router.routerState.root.firstChild?.component).toBe(CertificadoComponent);
  });
});
