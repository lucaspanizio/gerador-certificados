import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { Navbar } from './';
import { TestBed } from '@angular/core/testing';

/* -------------------------------------------------------------------------- */
/*                               Mock Component                               */
/* -------------------------------------------------------------------------- */

@Component({
  selector: 'app-mock-component',
  template: `<div>MockComponent works!</div>`,
})
class MockComponent {}

/* -------------------------------------------------------------------------- */
/*                                   Setup                                    */
/* -------------------------------------------------------------------------- */

beforeEach(async () => {
  await render(Navbar, {
    providers: [
      provideRouter([
        { path: '', component: MockComponent },
        { path: 'certificados', component: MockComponent },
        { path: 'certificados/novo', component: MockComponent },
      ]),
    ],
  });
});

/* -------------------------------------------------------------------------- */
/*                                   Tests                                    */
/* -------------------------------------------------------------------------- */

describe('Navbar', () => {
  it('deve renderizar o componente', () => {
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('deve renderizar os links de navegação', () => {
    const links = screen.getAllByRole('link');

    const expectations = [
      { text: /lista de certificados/i, href: '/certificados' },
      { text: /gerar certificado/i, href: '/certificados/novo' },
    ];

    // ignora o logo (primeiro link)
    const navLinks = links.slice(1);

    expect(navLinks).toHaveLength(2);

    navLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(expectations[index].text);
      expect(link).toHaveAttribute('href', expectations[index].href);
    });
  });

  it('deve navegar para a página inicial ao clicar na logo', async () => {
    const user = userEvent.setup();
    const location = TestBed.inject(Location);

    await user.click(screen.getByTestId('logo'));

    expect(location.path()).toBe('/');
  });

  it('deve navegar para a lista de certificados ao clicar no link correspondente', async () => {
    const user = userEvent.setup();
    const location = TestBed.inject(Location);

    await user.click(screen.getByRole('link', { name: /lista de certificados/i }));

    expect(location.path()).toBe('/certificados');
  });

  it('deve navegar para o formulário de criação ao clicar no link correspondente', async () => {
    const user = userEvent.setup();
    const location = TestBed.inject(Location);

    await user.click(screen.getByRole('link', { name: /gerar certificado/i }));

    expect(location.path()).toBe('/certificados/novo');
  });
});
