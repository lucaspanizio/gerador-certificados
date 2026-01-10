import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';

import { Layout } from './';

describe('Layout', () => {
  beforeEach(async () => await render(Layout));

  it('deve renderizar o componente', () => {
    const wrapper = screen.getByTestId('layout');
    const navbar = screen.getByTestId('navbar');
    const content = screen.getByTestId('content');

    expect(wrapper).toBeInTheDocument();
    expect(navbar).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('deve conter as classes esperadas', () => {
    const wrapper = screen.getByTestId('layout');
    const content = screen.getByTestId('content');

    const wrapperClasses = ['grid', 'grid-rows-[auto_1fr]', 'gap-y-10', 'min-h-screen', 'pt-18'];
    const contentClasses = ['container', 'mx-auto', 'px-5', 'md:px-20', 'lg:max-w-3/4'];

    wrapperClasses.forEach((className) => expect(wrapper).toHaveClass(className));
    contentClasses.forEach((className) => expect(content).toHaveClass(className));
  });
});
