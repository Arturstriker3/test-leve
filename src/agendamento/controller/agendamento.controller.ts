import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoStatus } from '../interface/agendamento.interface';
import { validateCreateAgendamento, validateUpdateAgendamento, isValidUUID } from '../../utils/validation';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
  createdResponse,
} from '../../utils/response';

const agendamentoService = new AgendamentoService();

export const criarAgendamento = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return errorResponse('Corpo da requisição é obrigatório');
    }

    const dadosRequisicao = JSON.parse(event.body);
    const erroValidacao = validateCreateAgendamento(dadosRequisicao);

    if (erroValidacao) {
      return errorResponse(erroValidacao);
    }

    const agendamento = await agendamentoService.criarAgendamento(dadosRequisicao);
    return createdResponse(agendamento);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return serverErrorResponse();
  }
};

export const obterAgendamentoPorId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID do agendamento é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID do agendamento inválido');
    }

    const agendamento = await agendamentoService.obterAgendamentoPorId(id);

    if (!agendamento) {
      return notFoundResponse('Agendamento não encontrado');
    }

    return successResponse(agendamento);
  } catch (error) {
    console.error('Erro ao obter agendamento:', error);
    return serverErrorResponse();
  }
};

export const listarAgendamentos = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { agendaId, status, dataInicio, dataFim } = event.queryStringParameters || {};
    
    const filtros = {
      agendaId: agendaId || undefined,
      status: status ? status as AgendamentoStatus : undefined,
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
    };

    // Remove undefined values to make it compatible with AgendamentoFiltros
    const filtrosLimpos = Object.fromEntries(
      Object.entries(filtros).filter(([, value]) => value !== undefined)
    );

    const agendamentos = await agendamentoService.listarAgendamentos(filtrosLimpos);
    return successResponse(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    return serverErrorResponse();
  }
};

export const atualizarAgendamento = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID do agendamento é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID do agendamento inválido');
    }

    if (!event.body) {
      return errorResponse('Corpo da requisição é obrigatório');
    }

    const dadosRequisicao = JSON.parse(event.body);
    const erroValidacao = validateUpdateAgendamento(dadosRequisicao);

    if (erroValidacao) {
      return errorResponse(erroValidacao);
    }

    const agendamentoAtualizado = await agendamentoService.atualizarAgendamento(id, dadosRequisicao);

    if (!agendamentoAtualizado) {
      return notFoundResponse('Agendamento não encontrado');
    }

    return successResponse(agendamentoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return serverErrorResponse();
  }
};

export const excluirAgendamento = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID do agendamento é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID do agendamento inválido');
    }

    const excluido = await agendamentoService.excluirAgendamento(id);

    if (!excluido) {
      return notFoundResponse('Agendamento não encontrado');
    }

    return successResponse({ message: 'Agendamento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    return serverErrorResponse();
  }
};

export const listarAgendamentosPorAgenda = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { agendaId } = event.pathParameters || {};

    if (!agendaId) {
      return errorResponse('ID da agenda é obrigatório');
    }

    if (!isValidUUID(agendaId)) {
      return errorResponse('Formato de ID da agenda inválido');
    }

    const agendamentos = await agendamentoService.listarAgendamentosPorAgenda(agendaId);
    return successResponse(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos por agenda:', error);
    return serverErrorResponse();
  }
}; 