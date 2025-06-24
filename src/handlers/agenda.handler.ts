import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { container } from '../shared/container/inversify.config';
import { TYPES } from '../shared/types/container-types';
import { AgendaController } from '../agenda/controller/agenda.controller';
import { LambdaResponse } from '../utils/lambda-response.util';

export const getAgendas = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const agendaController = container.get<AgendaController>(TYPES.AgendaController);
    const result = await agendaController.getAgendas();
    
    if (!result.success) {
      return LambdaResponse.internalServerError(result.message || 'Internal server error');
    }
    
    return LambdaResponse.ok(result);
  } catch (error) {
    console.error('Error in getAgendas handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
}; 