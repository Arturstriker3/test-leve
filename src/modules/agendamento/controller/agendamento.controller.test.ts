import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from '../service/agendamento.service';
import { CreateAgendamentoDto } from '../dto/create-agendamento.dto';

// Mock the service
const mockAgendamentoService = {
  createAgendamento: jest.fn(),
  getAgendamentos: jest.fn(),
  getAgendamentoById: jest.fn(),
  deleteAgendamento: jest.fn(),
};

describe('AgendamentoController', () => {
  let agendamentoController: AgendamentoController;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create controller with mocked service
    agendamentoController = new AgendamentoController(mockAgendamentoService as any);
  });

  describe('createAgendamento', () => {
    it('should create agendamento with valid data', async () => {
      const mockAgendamento = {
        id: 'new-uuid-123',
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
        created_at: '2024-01-15T10:30:00.000Z'
      };

      const requestBody = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-10-05 09:00'
        }
      };

      mockAgendamentoService.createAgendamento.mockResolvedValue(mockAgendamento);

      const result = await agendamentoController.createAgendamento(requestBody);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAgendamento);
      expect(result.message).toBe('Agendamento created successfully');
      expect(mockAgendamentoService.createAgendamento).toHaveBeenCalledWith(requestBody);
    });

    it('should return validation error for invalid data', async () => {
      const invalidRequestBody = {
        agendamento: {
          medico: '', // Invalid: empty string
          paciente: 'Carlos Almeida',
          data_horario: 'invalid-date' // Invalid: not a valid date
        }
      };

      const result = await agendamentoController.createAgendamento(invalidRequestBody);

      expect(result.success).toBe(false);
      expect(mockAgendamentoService.createAgendamento).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      const requestBody = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-10-05 09:00'
        }
      };

      mockAgendamentoService.createAgendamento.mockRejectedValue(new Error('Database error'));

      const result = await agendamentoController.createAgendamento(requestBody);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Database error');
    });
  });

  describe('getAgendamentos', () => {
    it('should return paginated agendamentos', async () => {
      const mockPaginatedResponse = {
        data: [
          {
            id: 'a1b2c3d4-5e6f-7890-abcd-ef1234567890',
            medico: 'Dr. João Silva',
            paciente: 'Carlos Almeida',
            data_horario: '2024-10-05 09:00',
            created_at: '2024-01-15T10:30:00.000Z'
          }
        ],
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 1,
          total_pages: 1,
          has_next_page: false,
          has_previous_page: false
        }
      };

      mockAgendamentoService.getAgendamentos.mockResolvedValue(mockPaginatedResponse);

      const result = await agendamentoController.getAgendamentos({ page: 1, limit: 10 });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPaginatedResponse.data);
      expect(result.pagination).toEqual(mockPaginatedResponse.pagination);
      expect(result.message).toBe('Agendamentos retrieved successfully');
    });

    it('should handle service errors', async () => {
      mockAgendamentoService.getAgendamentos.mockRejectedValue(new Error('Service error'));

      const result = await agendamentoController.getAgendamentos();

      expect(result.success).toBe(false);
      expect(result.message).toBe('Service error');
    });
  });

  describe('getAgendamentoById', () => {
    it('should return agendamento when found', async () => {
      const mockAgendamento = {
        id: 'a1b2c3d4-5e6f-7890-abcd-ef1234567890',
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
        created_at: '2024-01-15T10:30:00.000Z'
      };

      mockAgendamentoService.getAgendamentoById.mockResolvedValue(mockAgendamento);

      const result = await agendamentoController.getAgendamentoById('a1b2c3d4-5e6f-7890-abcd-ef1234567890');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAgendamento);
      expect(result.message).toBe('Agendamento retrieved successfully');
      expect(mockAgendamentoService.getAgendamentoById).toHaveBeenCalledWith('a1b2c3d4-5e6f-7890-abcd-ef1234567890');
    });

    it('should return 404 when agendamento not found', async () => {
      mockAgendamentoService.getAgendamentoById.mockResolvedValue(null);

      const result = await agendamentoController.getAgendamentoById('invalid-uuid');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Agendamento not found');
    });
  });

  describe('deleteAgendamento', () => {
    it('should delete agendamento successfully', async () => {
      mockAgendamentoService.deleteAgendamento.mockResolvedValue(true);

      const result = await agendamentoController.deleteAgendamento('a1b2c3d4-5e6f-7890-abcd-ef1234567890');

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ deleted: true });
      expect(result.message).toBe('Agendamento deleted successfully');
      expect(mockAgendamentoService.deleteAgendamento).toHaveBeenCalledWith('a1b2c3d4-5e6f-7890-abcd-ef1234567890');
    });

    it('should return 404 when agendamento not found for deletion', async () => {
      mockAgendamentoService.deleteAgendamento.mockResolvedValue(false);

      const result = await agendamentoController.deleteAgendamento('invalid-uuid');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Agendamento not found');
    });
  });
}); 