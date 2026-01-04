import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Layout } from './';

describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    fixture.detectChanges();
  });

  it('deve renderizar corretamente', () => {
    const element: HTMLElement = fixture.nativeElement;
    let expectedClasses: string[];

    // wrapper principal
    const layout = element.querySelector('div#layout');
    expect(layout).not.toBeNull();

    expectedClasses = ['grid', 'grid-rows-[auto_1fr]', 'gap-y-10', 'min-h-screen', 'pt-18'];

    expectedClasses.forEach((className) => {
      expect(layout!.className).toContain(className);
    });

    // navbar (composição, não comportamento)
    const navbar = element.querySelector('app-navbar');
    expect(navbar).not.toBeNull();

    expectedClasses = ['container', 'mx-auto', 'px-5', 'md:px-20', 'lg:max-w-3/4'];

    // área de conteúdo
    const main = element.querySelector('main#content');
    expect(main).not.toBeNull();

    expectedClasses.forEach((className) => {
      expect(main!.className).toContain(className);
    });
  });
});
