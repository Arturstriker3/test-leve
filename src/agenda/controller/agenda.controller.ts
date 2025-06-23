import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendaService } from '../service/agenda.service';
import { validateCreateAgenda, validateUpdateAgenda, isValidUUID } from '../../utils/validation';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
  createdResponse,
} from '../../utils/response';

const agendaService = new AgendaService();

export const criarAgenda = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return errorResponse('Corpo da requisição é obrigatório');
    }

    const dadosRequisicao = JSON.parse(event.body);
    const erroValidacao = validateCreateAgenda(dadosRequisicao);

    if (erroValidacao) {
      return errorResponse(erroValidacao);
    }

    const agenda = await agendaService.criarAgenda(dadosRequisicao);
    return createdResponse(agenda);
  } catch (error) {
    console.error('Erro ao criar agenda:', error);
    return serverErrorResponse();
  }
};

export const obterAgendaPorId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID da agenda é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID da agenda inválido');
    }

    const agenda = await agendaService.obterAgendaPorId(id);

    if (!agenda) {
      return notFoundResponse('Agenda não encontrada');
    }

    return successResponse(agenda);
  } catch (error) {
    console.error('Erro ao obter agenda:', error);
    return serverErrorResponse();
  }
};

export const listarAgendas = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { nome, ativo } = event.queryStringParameters || {};
    
    const filtros = {
      nome: nome || undefined,
      ativo: ativo ? ativo === 'true' : undefined,
    };

    // Remove undefined values to make it compatible with AgendaFiltros
    const filtrosLimpos = Object.fromEntries(
      Object.entries(filtros).filter(([, value]) => value !== undefined)
    );

    const agendas = await agendaService.listarAgendas(filtrosLimpos);
    return successResponse(agendas);
  } catch (error) {
    console.error('Erro ao listar agendas:', error);
    return serverErrorResponse();
  }
};

export const atualizarAgenda = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID da agenda é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID da agenda inválido');
    }

    if (!event.body) {
      return errorResponse('Corpo da requisição é obrigatório');
    }

    const dadosRequisicao = JSON.parse(event.body);
    const erroValidacao = validateUpdateAgenda(dadosRequisicao);

    if (erroValidacao) {
      return errorResponse(erroValidacao);
    }

    const agendaAtualizada = await agendaService.atualizarAgenda(id, dadosRequisicao);

    if (!agendaAtualizada) {
      return notFoundResponse('Agenda não encontrada');
    }

    return successResponse(agendaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar agenda:', error);
    return serverErrorResponse();
  }
};

export const excluirAgenda = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return errorResponse('ID da agenda é obrigatório');
    }

    if (!isValidUUID(id)) {
      return errorResponse('Formato de ID da agenda inválido');
    }

    const excluido = await agendaService.excluirAgenda(id);

    if (!excluido) {
      return notFoundResponse('Agenda não encontrada');
    }

    return successResponse({ message: 'Agenda excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir agenda:', error);
    return serverErrorResponse();
  }
}; 