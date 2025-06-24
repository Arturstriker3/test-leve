import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { container } from '../shared/container/inversify.config';
import { TYPES } from '../shared/types/container-types';
import { AgendaController } from '../agenda/controller/agenda.controller';
import { LambdaResponse } from '../utils/lambda-response.util';
import { PaginationUtil } from '../shared/utils/pagination.util';
import { ValidationUtil } from '../shared/utils/validation.util';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

export const getAgendas = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // Validate query parameters
    const validationResult = await ValidationUtil.validateQueryParams(
      PaginationQueryDto,
      event.queryStringParameters || {}
    );

    if (!validationResult.isValid) {
      return LambdaResponse.badRequest(validationResult.response!);
    }

    const agendaController = container.get<AgendaController>(TYPES.AgendaController);
    
    // Use validated pagination parameters
    const paginationParams = {
      page: validationResult.data?.page,
      limit: validationResult.data?.limit
    };
    
    const result = await agendaController.getAgendas(paginationParams);
    
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