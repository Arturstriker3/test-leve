import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { container } from '../modules/shared/container/inversify.config';
import { TYPES } from '../modules/shared/types/container-types';
import { MedicoController } from '../modules/medico/controller/medico.controller';
import { LambdaResponse } from '../utils/lambda-response.util';
import { ValidationUtil } from '../modules/shared/utils/validation.util';
import { PaginationQueryDto } from '../modules/shared/dto/pagination-query.dto';

export const getMedicos = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // Validate pagination parameters
    const paginationValidation = await ValidationUtil.validateQueryParams(
      PaginationQueryDto,
      event.queryStringParameters || {}
    );

    if (!paginationValidation.isValid) {
      return LambdaResponse.badRequest(paginationValidation.response!);
    }

    const medicoController = container.get<MedicoController>(TYPES.MedicoController);
    
    // Use validated pagination parameters and pass all query params for filter validation
    const paginationParams = {
      page: paginationValidation.data?.page,
      limit: paginationValidation.data?.limit
    };
    
    const result = await medicoController.getMedicos(paginationParams, event.queryStringParameters);
    
    if (!result.success) {
      return LambdaResponse.internalServerError(result.message || 'Internal server error');
    }
    
    return LambdaResponse.ok(result);
  } catch (error) {
    console.error('Error in getMedicos handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
}; 