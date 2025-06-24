import 'reflect-metadata';
import { AgendaService } from './agenda.service';
import { AgendaResponse } from '../interface/agenda-response.interface';
import { MedicoService } from '../../medico/service/medico.service';

describe('GetAgendasUseCase', () => {
  let agendaService: AgendaService;
  let mockMedicoService: jest.Mocked<MedicoService>;

  beforeEach(() => {
    mockMedicoService = {
      getMedicos: jest.fn(),
      getMedicoById: jest.fn(),
      getMedicosByEspecialidade: jest.fn(),
    } as jest.Mocked<MedicoService>;

    agendaService = new AgendaService(mockMedicoService);
  });

  describe('getAgendas', () => {
    it('should return agendas with correct structure', async () => {
      // Arrange
      const mockMedicosResponse = {
        data: [
          {
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
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

      mockMedicoService.getMedicos.mockResolvedValue(mockMedicosResponse);

      // Act
      const result: AgendaResponse = await agendaService.getAgendas();

      // Assert
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.pagination).toBeDefined();
    });

    it('should return medicos from MedicoService', async () => {
      // Arrange
      const mockMedicosResponse = {
        data: [
          {
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            nome: "Dr. João Silva",
            especialidade: "Cardiologista",
            horarios_disponiveis: ["2024-10-05 09:00"]
          },
          {
            id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
            nome: "Dra. Maria Souza",
            especialidade: "Dermatologista",
            horarios_disponiveis: ["2024-10-06 14:00"]
          }
        ],
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 2,
          total_pages: 1,
          has_next_page: false,
          has_previous_page: false,
        }
      };

      mockMedicoService.getMedicos.mockResolvedValue(mockMedicosResponse);

      // Act
      const result = await agendaService.getAgendas();

      // Assert
      expect(result.data).toHaveLength(2);
      expect(mockMedicoService.getMedicos).toHaveBeenCalledTimes(1);
    });

    it('should call MedicoService.getMedicos without parameters', async () => {
      // Arrange
      const mockMedicosResponse = {
        data: [],
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 0,
          total_pages: 0,
          has_next_page: false,
          has_previous_page: false,
        }
      };

      mockMedicoService.getMedicos.mockResolvedValue(mockMedicosResponse);

      // Act
      await agendaService.getAgendas();

      // Assert
      expect(mockMedicoService.getMedicos).toHaveBeenCalledWith(undefined);
    });

    it('should pass pagination parameters to MedicoService', async () => {
      // Arrange
      const paginationParams = { page: 2, limit: 5 };
      const mockMedicosResponse = {
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

      mockMedicoService.getMedicos.mockResolvedValue(mockMedicosResponse);

      // Act
      await agendaService.getAgendas(paginationParams);

      // Assert
      expect(mockMedicoService.getMedicos).toHaveBeenCalledWith(paginationParams);
    });

    it('should handle errors from MedicoService', async () => {
      // Arrange
      const errorMessage = 'Service error';
      mockMedicoService.getMedicos.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(agendaService.getAgendas()).rejects.toThrow(errorMessage);
    });
  });
}); 