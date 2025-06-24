import { APIGatewayProxyResult } from 'aws-lambda';

export class LambdaResponse {
  static ok(body: any): APIGatewayProxyResult {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(body),
    };
  }

  static error(statusCode: number, message: string): APIGatewayProxyResult {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message,
        success: false,
        timestamp: new Date().toISOString(),
      }),
    };
  }

  static badRequest(message: string): APIGatewayProxyResult {
    return this.error(400, message);
  }

  static notFound(message: string): APIGatewayProxyResult {
    return this.error(404, message);
  }

  static internalServerError(message: string): APIGatewayProxyResult {
    return this.error(500, message);
  }
} 