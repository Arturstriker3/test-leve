import 'reflect-metadata';
import { MedicoController } from './medico.controller';
import { MedicoService } from '../service/medico.service';
import { PaginatedApiResponse } from '../../shared/interfaces/paginated-api-response.interface';
import { BaseResponse } from '../../shared/interfaces/base-response.interface';
import { Medico } from '../interface/medico.interface';
import { PaginationParams } from '../../shared/utils/pagination.util';

describe('MedicoController', () => {
  let medicoController: MedicoController;
  let mockMedicoService: jest.Mocked<MedicoService>;

  beforeEach(() => {
    mockMedicoService = {
      getMedicos: jest.fn(),
      getMedicoById: jest.fn(),
      getMedicosByEspecialidade: jest.fn(),
    } as any;

    medicoController = new MedicoController(mockMedicoService);
  });

  describe('getMedicos', () => {
    it('should return paginated medicos successfully', async () => {
      // Arrange
      const mockPaginatedResponse = {
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

      mockMedicoService.getMedicos.mockResolvedValue(mockPaginatedResponse);

      // Act
      const result = await medicoController.getMedicos();

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPaginatedResponse.data);
      expect(result.pagination).toEqual(mockPaginatedResponse.pagination);
      expect(result.message).toBe('Medicos retrieved successfully');
      expect(result.timestamp).toBeDefined();
      expect(mockMedicoService.getMedicos).toHaveBeenCalledWith(undefined, {});
    });

    it('should pass pagination parameters to service', async () => {
      // Arrange
      const paginationParams: PaginationParams = { page: 2, limit: 5 };
      const mockPaginatedResponse = {
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

      mockMedicoService.getMedicos.mockResolvedValue(mockPaginatedResponse);

      // Act
      const result = await medicoController.getMedicos(paginationParams);

      // Assert
      expect(result.success).toBe(true);
      expect(mockMedicoService.getMedicos).toHaveBeenCalledWith(paginationParams, {});
    });

    it('should handle service errors', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      mockMedicoService.getMedicos.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await medicoController.getMedicos();

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(errorMessage);
    });
  });

  describe('getMedicoById', () => {
    it('should return medico when found', async () => {
      // Arrange
      const mockMedico: Medico = {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        nome: "Dr. João Silva",
        especialidade: "Cardiologista",
        horarios_disponiveis: ["2024-10-05 09:00"]
      };

      mockMedicoService.getMedicoById.mockResolvedValue(mockMedico);

      // Act
      const result = await medicoController.getMedicoById('f47ac10b-58cc-4372-a567-0e02b2c3d479');

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockMedico);
      expect(result.message).toBe('Medico retrieved successfully');
      expect(mockMedicoService.getMedicoById).toHaveBeenCalledWith('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    });

    it('should return error when medico not found', async () => {
      // Arrange
      mockMedicoService.getMedicoById.mockResolvedValue(null);

      // Act
      const result = await medicoController.getMedicoById('invalid-uuid');

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Medico not found');
      expect(result.data).toBeUndefined();
      expect(mockMedicoService.getMedicoById).toHaveBeenCalledWith('invalid-uuid');
    });

    it('should handle service errors', async () => {
      // Arrange
      const errorMessage = 'Database error';
      mockMedicoService.getMedicoById.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await medicoController.getMedicoById('f47ac10b-58cc-4372-a567-0e02b2c3d479');

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(errorMessage);
    });
  });

  describe('getMedicosByEspecialidade', () => {
    it('should return medicos by especialidade', async () => {
      // Arrange
      const mockMedicos: Medico[] = [
        {
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          nome: "Dr. João Silva",
          especialidade: "Cardiologista",
          horarios_disponiveis: ["2024-10-05 09:00"]
        }
      ];

      mockMedicoService.getMedicosByEspecialidade.mockResolvedValue(mockMedicos);

      // Act
      const result = await medicoController.getMedicosByEspecialidade('Cardiologista');

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockMedicos);
      expect(result.message).toBe('Medicos by especialidade retrieved successfully');
      expect(mockMedicoService.getMedicosByEspecialidade).toHaveBeenCalledWith('Cardiologista');
    });

    it('should return empty array when no medicos found for especialidade', async () => {
      // Arrange
      mockMedicoService.getMedicosByEspecialidade.mockResolvedValue([]);

      // Act
      const result = await medicoController.getMedicosByEspecialidade('Neurologia');

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
      expect(result.message).toBe('Medicos by especialidade retrieved successfully');
    });

    it('should handle service errors', async () => {
      // Arrange
      const errorMessage = 'Service error';
      mockMedicoService.getMedicosByEspecialidade.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await medicoController.getMedicosByEspecialidade('Cardiologista');

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(errorMessage);
    });

    it('should handle non-Error exceptions', async () => {
      // Arrange
      mockMedicoService.getMedicosByEspecialidade.mockRejectedValue('String error');

      // Act
      const result = await medicoController.getMedicosByEspecialidade('Cardiologista');

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to retrieve medicos by especialidade');
    });
  });
}); 