import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MedicosService } from '../service/medicos.service';
import { successResponse, serverErrorResponse } from '../../utils/response';

const medicosService = new MedicosService();

export const listarMedicos = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const medicos = await medicosService.listarMedicos();
    return successResponse(medicos);
  } catch (error) {
    console.error('Erro ao listar médicos:', error);
    return serverErrorResponse();
  }
}; 