import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';

import { Navbar } from './';

@Component({
  selector: `app-mock-component`,
  template: `<div>MockComponent works!</div>`,
})
class MockComponent {}

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([
          { path: 'certificados', component: MockComponent },
          { path: 'certificados/novo', component: MockComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('deve renderizar corretamente', () => {
    [
      'nav#navbar',
      'div#navbar-inner',
      'a#navbar-logo',
      'div#navbar-items',
      'ul#navbar-list',
    ].forEach((selector) => {
      expect(element.querySelector(selector)).not.toBeNull();
    });

    const items = element.querySelectorAll('li.navbar-item');
    expect(items.length).toBe(2);

    items.forEach((item) => expect(item.querySelector('a.navbar-link')).not.toBeNull());
  });

  it('deve configurar o link do logo para a home', () => {
    const logo = element.querySelector('a#navbar-logo') as HTMLAnchorElement;

    expect(logo).not.toBeNull();
    expect(logo.getAttribute('href')).toBe('/');
  });

  it('deve renderizar os links de navegação', () => {
    const logo = element.querySelector('#navbar-logo') as HTMLAnchorElement;
    expect(logo.getAttribute('href')).toBe('/');

    const links = element.querySelectorAll('a.navbar-link') as NodeListOf<HTMLAnchorElement>;

    expect(links.length).toBe(2);

    const expectations = [
      { text: 'Lista de certificados', href: '/certificados' },
      { text: 'Gerar certificado', href: '/certificados/novo' },
    ];

    links.forEach((link, index) => {
      expect(link.textContent).toContain(expectations[index].text);
      expect(link.getAttribute('href')).toBe(expectations[index].href);
    });
  });

  [
    { index: 0, url: '/certificados', description: 'deve navegar para a lista de certificados' },
    {
      index: 1,
      url: '/certificados/novo',
      description: 'deve navegar para o formulário de criação',
    },
  ].forEach(({ index, url, description }) => {
    it(description, async () => {
      const router = TestBed.inject(Router);

      const links = element.querySelectorAll('a.navbar-link') as NodeListOf<HTMLAnchorElement>;

      links[index].click();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(router.url).toBe(url);
    });
  });
});
