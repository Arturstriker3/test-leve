import { ProductResponse } from '../types/product';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const createResponse = (statusCode: number, body: object | string): ProductResponse => ({
  statusCode,
  body: typeof body === 'string' ? body : JSON.stringify(body),
  headers: corsHeaders,
});

export const successResponse = (data: object, statusCode = 200): ProductResponse =>
  createResponse(statusCode, { success: true, data });

export const errorResponse = (message: string, statusCode = 400): ProductResponse =>
  createResponse(statusCode, { success: false, error: message });

export const notFoundResponse = (message = 'Resource not found'): ProductResponse =>
  errorResponse(message, 404);

export const serverErrorResponse = (message = 'Internal server error'): ProductResponse =>
  errorResponse(message, 500);

export const createdResponse = (data: object): ProductResponse =>
  successResponse(data, 201); 