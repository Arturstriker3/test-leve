import 'reflect-metadata';
import { AgendaController } from './agenda.controller';
import { AgendaService } from '../service/agenda.service';
import { BaseResponse } from '../../shared/interfaces/base-response.interface';
import { AgendaResponse } from '../interface/agenda-response.interface';

describe('AgendaController', () => {
  let agendaController: AgendaController;
  let mockAgendaService: jest.Mocked<AgendaService>;

  beforeEach(() => {
    mockAgendaService = {
      getAgendas: jest.fn(),
    } as jest.Mocked<AgendaService>;

    agendaController = new AgendaController(mockAgendaService);
  });

  describe('getAgendas', () => {
    it('should return success response when service returns data', async () => {
      // Arrange
      const mockServiceResponse: AgendaResponse = {
        medicos: [
          {
            id: 1,
            nome: "Dr. João Silva",
            especialidade: "Cardiologista",
            horarios_disponiveis: ["2024-10-05 09:00"]
          }
        ]
      };

      mockAgendaService.getAgendas.mockResolvedValue(mockServiceResponse);

      // Act
      const result = await agendaController.getAgendas();

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockServiceResponse);
      expect(result.message).toBe('Agendas retrieved successfully');
      expect(result.timestamp).toBeDefined();
      expect(mockAgendaService.getAgendas).toHaveBeenCalledTimes(1);
    });

    it('should return error response when service throws error', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      mockAgendaService.getAgendas.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await agendaController.getAgendas();

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(errorMessage);
      expect(result.data).toBeUndefined();
      expect(result.timestamp).toBeDefined();
      expect(mockAgendaService.getAgendas).toHaveBeenCalledTimes(1);
    });

    it('should return generic error message when service throws non-Error object', async () => {
      // Arrange
      mockAgendaService.getAgendas.mockRejectedValue('String error');

      // Act
      const result = await agendaController.getAgendas();

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to retrieve agendas');
      expect(result.data).toBeUndefined();
      expect(mockAgendaService.getAgendas).toHaveBeenCalledTimes(1);
    });
  });
}); 