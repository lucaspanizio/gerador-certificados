import { render, screen } from '@testing-library/angular';

import { Button } from './';

describe('Button', () => {
  it('deve renderizar o componente', async () => {
    const { getByRole } = await render(Button);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('deve usar valores padrão', async () => {
    await render(Button);

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button.className).toContain('primary');
  });

  it('deve aplicar a classe conforme a variant', async () => {
    await render(Button, {
      componentInputs: {
        variant: 'secondary',
      },
    });

    const button = screen.getByRole('button');

    expect(button.className).toContain('secondary');
  });

  it('deve desabilitar o botão quando disabled for true', async () => {
    await render(Button, {
      componentInputs: {
        disabled: true,
      },
    });

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('deve habilitar o botão quando disabled for false', async () => {
    await render(Button, {
      componentInputs: {
        disabled: false,
      },
    });

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
  });

  it('deve usar type="button" por padrão', async () => {
    await render(Button);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
  });

  it('deve permitir type="submit"', async () => {
    await render(Button, {
      componentInputs: {
        type: 'submit',
      },
    });

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('deve renderizar o conteúdo interno', async () => {
    await render(`<app-button>Salvar</app-button>`, {
      imports: [Button],
    });

    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });
});
