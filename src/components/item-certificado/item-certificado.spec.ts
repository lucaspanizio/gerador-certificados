import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';

import { CertificadoComponent } from './../../pages/certificado';
import { Certificado } from './../../interfaces/certificado';
import { ItemCertificado } from './';

const certificadoMock = {
  id: '123',
  nome: 'Jhon Doe',
  dataEmissao: new Date('2024-01-01T10:30:00-03:00').getTime(),
} satisfies Omit<Certificado, 'atividades'>;

describe('ItemCertificado', () => {
  beforeEach(async () => {
    await render(ItemCertificado, {
      componentInputs: { data: certificadoMock },
      providers: [provideRouter([{ path: 'certificados/:id', component: CertificadoComponent }])],
    });
  });

  it('deve renderizar o componente', async () => {
    const item = screen.getByTestId(`item-certificado-${certificadoMock.id}`);
    expect(item).toBeInTheDocument();
  });

  it('deve renderizar com os dados corretos', () => {
    expect(screen.getByText(/jhon doe/i)).toBeInTheDocument();

    expect(screen.getByText(/01\/01\/2024 às 10:30/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /ver/i })).toBeInTheDocument();
  });

  it('deve navegar para o certificado ao clicar no botão Ver', async () => {
    const user = userEvent.setup();

    const location = TestBed.inject(Location);

    await user.click(screen.getByRole('button', { name: /ver/i }));

    expect(location.path()).toBe(`/certificados/${certificadoMock.id}`);
  });
});
