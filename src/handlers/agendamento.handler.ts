import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { container } from '../modules/shared/container/inversify.config';
import { TYPES } from '../modules/shared/types/container-types';
import { AgendamentoController } from '../modules/agendamento/controller/agendamento.controller';
import { LambdaResponse } from '../utils/lambda-response.util';
import { ValidationUtil } from '../modules/shared/utils/validation.util';
import { PaginationQueryDto } from '../modules/shared/dto/pagination-query.dto';
import { CreateAgendamentoDto } from '../modules/agendamento/dto/create-agendamento.dto';

export const getAgendamentos = async (
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

    const agendamentoController = container.get<AgendamentoController>(TYPES.AgendamentoController);
    
    // Use validated pagination parameters and pass all query params for filter validation
    const paginationParams = {
      page: paginationValidation.data?.page,
      limit: paginationValidation.data?.limit
    };
    
    const result = await agendamentoController.getAgendamentos(paginationParams, event.queryStringParameters);
    
    if (!result.success) {
      return LambdaResponse.internalServerError(result.message || 'Internal server error');
    }
    
    return LambdaResponse.ok(result);
  } catch (error) {
    console.error('Error in getAgendamentos handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
};

export const getAgendamentoById = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};
    
    if (!id) {
      return LambdaResponse.badRequest('ID parameter is required');
    }

    const agendamentoController = container.get<AgendamentoController>(TYPES.AgendamentoController);
    const result = await agendamentoController.getAgendamentoById(id);
    
    if (!result.success) {
      return LambdaResponse.notFound(result.message || 'Agendamento not found');
    }
    
    return LambdaResponse.ok(result);
  } catch (error) {
    console.error('Error in getAgendamentoById handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
};

export const createAgendamento = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return LambdaResponse.badRequest('Request body is required');
    }

    const payload = JSON.parse(event.body);
    
    // Validate payload parameters
    const payloadValidation = await ValidationUtil.validatePayload(
      CreateAgendamentoDto,
      payload
    );

    if (!payloadValidation.isValid) {
      return LambdaResponse.badRequest(payloadValidation.response!);
    }
    
    const agendamentoController = container.get<AgendamentoController>(TYPES.AgendamentoController);
    const result = await agendamentoController.createAgendamento(payloadValidation.data!);
    
    if (!result.success) {
      return LambdaResponse.badRequest(result);
    }
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error in createAgendamento handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
};

export const deleteAgendamento = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};
    
    if (!id) {
      return LambdaResponse.badRequest('ID parameter is required');
    }

    const agendamentoController = container.get<AgendamentoController>(TYPES.AgendamentoController);
    const result = await agendamentoController.deleteAgendamento(id);
    
    if (!result.success) {
      return LambdaResponse.notFound(result.message || 'Agendamento not found');
    }
    
    return LambdaResponse.ok(result);
  } catch (error) {
    console.error('Error in deleteAgendamento handler:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return LambdaResponse.internalServerError(message);
  }
}; 