import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Router } from '@angular/router';

import { FormCertificadoComponent } from './';
import { CertificadoService } from '../../services/certificado';

const certificadoServiceMock = { addCertificado: vi.fn() };
const routerMock = { navigate: vi.fn() };

describe('FormCertificadoComponent', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    await render(FormCertificadoComponent, {
      providers: [
        { provide: CertificadoService, useValue: certificadoServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('deve renderizar a estrutura inicial do formulário', () => {
    expect(screen.getByRole('heading', { name: /geração de certificado/i })).toBeInTheDocument();

    expect(
      screen.getByText(/preencha os dados para gerar um novo certificado/i)
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/digite o nome completo do aluno/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/digite o título da atividade/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem de lista vazia inicialmente', () => {
    expect(screen.getByText(/nenhuma atividade adicionada/i)).toBeInTheDocument();

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('deve iniciar com o botão de gerar certificado desabilitado', () => {
    expect(screen.getByRole('button', { name: /gerar certificado/i })).toBeDisabled();
  });

  it('deve desabilitar o botão de adicionar quando a atividade estiver vazia', () => {
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeDisabled();
  });

  it('deve habilitar o botão de adicionar ao digitar uma atividade válida', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), 'Angular');

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeEnabled();
  });

  it('deve adicionar uma atividade válida', async () => {
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/digite o título da atividade/i),
      'Angular avançado'
    );

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(screen.getByText('Angular avançado')).toBeInTheDocument();
  });

  it('não deve adicionar uma atividade vazia (apenas espaços)', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), '   ');

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(screen.getByText(/nenhuma atividade adicionada/i)).toBeInTheDocument();
  });

  it('deve exibir erro ao tentar adicionar uma atividade duplicada', async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/digite o título da atividade/i);
    const addButton = screen.getByRole('button', { name: /adicionar/i });

    await user.type(input, 'Angular');
    await user.click(addButton);

    await user.type(input, 'Angular');
    await user.click(addButton);

    expect(screen.getByText(/esta atividade já foi adicionada/i)).toBeInTheDocument();
  });

  it('deve remover a mensagem de erro de duplicidade ao alterar o valor do input', async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/digite o título da atividade/i);
    const addButton = screen.getByRole('button', { name: /adicionar/i });

    await user.type(input, 'Angular');
    await user.click(addButton);

    await user.type(input, 'Angular');
    await user.click(addButton);

    expect(screen.getByText(/esta atividade já foi adicionada/i)).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'React');

    expect(screen.queryByText(/esta atividade já foi adicionada/i)).not.toBeInTheDocument();
  });

  it('deve renderizar a lista de atividades quando houver itens', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), 'Angular');

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('deve remover uma atividade ao clicar no botão X', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), 'Angular');

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    await user.click(screen.getByRole('button', { name: /remover atividade/i }));

    expect(screen.queryByText('Angular')).not.toBeInTheDocument();
  });

  it('deve exibir erro quando o nome for inválido', async () => {
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/digite o nome completo do aluno/i);

    await user.clear(nameInput);
    await user.tab(); // blur

    expect(screen.getByText(/o nome do aluno é obrigatório/i)).toBeInTheDocument();
  });

  it('não deve permitir submeter o formulário inválido', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /gerar certificado/i }));

    expect(certificadoServiceMock.addCertificado).not.toHaveBeenCalled();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('deve habilitar o botão de gerar certificado quando o formulário ficar válido', async () => {
    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /gerar certificado/i });

    expect(submitButton).toBeDisabled();

    await user.type(screen.getByPlaceholderText(/digite o nome completo do aluno/i), 'Lucas');

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), 'Angular');

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(submitButton).toBeEnabled();
  });

  it('deve criar o certificado e navegar para a página dele quando o formulário for válido', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite o nome completo do aluno/i), 'Lucas');

    await user.type(screen.getByPlaceholderText(/digite o título da atividade/i), 'Angular');

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    await user.click(screen.getByRole('button', { name: /gerar certificado/i }));

    expect(certificadoServiceMock.addCertificado).toHaveBeenCalledOnce();

    const certificadoCriado = certificadoServiceMock.addCertificado.mock.calls[0][0];

    expect(certificadoCriado.nome).toBe('Lucas');
    expect(certificadoCriado.atividades).toEqual(['Angular']);
    expect(certificadoCriado.id).toBeDefined();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/certificados', certificadoCriado.id]);
  });
});
