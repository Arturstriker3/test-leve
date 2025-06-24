import 'reflect-metadata';
import { AgendaController } from './agenda.controller';
import { AgendaService } from '../service/agenda.service';
import { MedicoService } from '../../medico/service/medico.service';
import { PaginatedApiResponse } from '../../shared/interfaces/paginated-api-response.interface';
import { AgendaResponse } from '../interface/agenda-response.interface';
import { Medico } from '../../medico/interface/medico.interface';

describe('AgendaController', () => {
  let agendaController: AgendaController;
  let mockAgendaService: jest.Mocked<AgendaService>;

  beforeEach(() => {
    mockAgendaService = {
      getAgendas: jest.fn(),
    } as any;

    agendaController = new AgendaController(mockAgendaService);
  });

  describe('getAgendas', () => {
    it('should return success response when service returns data', async () => {
      // Arrange
      const mockServiceResponse: AgendaResponse = {
        data: [
          {
            id: 1,
            nome: "Dr. João Silva",
            especialidade: "Cardiologista",
            horarios_disponiveis: ["2024-10-05 09:00"]
          }
        ],
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 1,
          total_pages: 1,
          has_next_page: false,
          has_previous_page: false,
        }
      };

      mockAgendaService.getAgendas.mockResolvedValue(mockServiceResponse);

      // Act
      const result = await agendaController.getAgendas();

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockServiceResponse.data);
      expect(result.pagination).toEqual(mockServiceResponse.pagination);
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

    it('should pass pagination parameters to service', async () => {
      // Arrange
      const paginationParams = { page: 2, limit: 5 };
      const mockServiceResponse: AgendaResponse = {
        data: [],
        pagination: {
          current_page: 2,
          per_page: 5,
          total: 0,
          total_pages: 0,
          has_next_page: false,
          has_previous_page: true,
        }
      };

      mockAgendaService.getAgendas.mockResolvedValue(mockServiceResponse);

      // Act
      const result = await agendaController.getAgendas(paginationParams);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockServiceResponse.data);
      expect(result.pagination).toEqual(mockServiceResponse.pagination);
      expect(mockAgendaService.getAgendas).toHaveBeenCalledWith(paginationParams);
    });
  });
}); 