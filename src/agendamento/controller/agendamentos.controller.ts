import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendamentosService } from '../service/agendamentos.service';
import { validateCreateAgendamento } from '../../utils/validation';
import {
  errorResponse,
  serverErrorResponse,
  successResponse,
} from '../../utils/response';

const agendamentosService = new AgendamentosService();

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

    const resultado = await agendamentosService.criarAgendamento(dadosRequisicao.agendamento);

    if (!resultado) {
      return errorResponse('Médico não encontrado ou horário não disponível');
    }

    return successResponse(resultado);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return serverErrorResponse();
  }
}; 