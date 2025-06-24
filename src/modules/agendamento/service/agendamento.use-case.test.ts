import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from '../dto/create-agendamento.dto';

describe('AgendamentoService Use Cases', () => {
  let agendamentoService: AgendamentoService;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
  });

  describe('createAgendamento', () => {
    it('should create a new agendamento with valid data', async () => {
      const createDto: CreateAgendamentoDto = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-10-05 09:00'
        }
      };

      const result = await agendamentoService.createAgendamento(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.medico).toBe('Dr. João Silva');
      expect(result.paciente).toBe('Carlos Almeida');
      expect(result.data_horario).toBe('2024-10-05 09:00');
      expect(result.created_at).toBeDefined();
    });

    it('should generate unique IDs for different agendamentos', async () => {
      const createDto1: CreateAgendamentoDto = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-10-05 09:00'
        }
      };

      const createDto2: CreateAgendamentoDto = {
        agendamento: {
          medico: 'Dra. Maria Souza',
          paciente: 'Ana Santos',
          data_horario: '2024-10-06 14:00'
        }
      };

      const result1 = await agendamentoService.createAgendamento(createDto1);
      const result2 = await agendamentoService.createAgendamento(createDto2);

      expect(result1.id).not.toBe(result2.id);
    });
  });

  describe('getAgendamentos', () => {
    it('should return paginated agendamentos', async () => {
      const result = await agendamentoService.getAgendamentos({ page: 1, limit: 2 });

      expect(result.data).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.data.length).toBeLessThanOrEqual(2);
      expect(result.pagination.current_page).toBe(1);
      expect(result.pagination.per_page).toBe(2);
    });

    it('should filter agendamentos by medico', async () => {
      const result = await agendamentoService.getAgendamentos(
        undefined,
        { medico: 'Dr. João Silva' }
      );

      expect(result.data).toBeDefined();
      result.data.forEach(agendamento => {
        expect(agendamento.medico.toLowerCase()).toContain('joão silva');
      });
    });

    it('should filter agendamentos by paciente', async () => {
      const result = await agendamentoService.getAgendamentos(
        undefined,
        { paciente: 'Carlos' }
      );

      expect(result.data).toBeDefined();
      result.data.forEach(agendamento => {
        expect(agendamento.paciente.toLowerCase()).toContain('carlos');
      });
    });
  });

  describe('getAgendamentoById', () => {
    it('should return agendamento when id exists', async () => {
      const result = await agendamentoService.getAgendamentoById('a1b2c3d4-5e6f-7890-abcd-ef1234567890');

      expect(result).toBeDefined();
      expect(result?.id).toBe('a1b2c3d4-5e6f-7890-abcd-ef1234567890');
      expect(result?.medico).toBe('Dr. João Silva');
    });

    it('should return null when id does not exist', async () => {
      const result = await agendamentoService.getAgendamentoById('invalid-uuid');

      expect(result).toBeNull();
    });
  });

  describe('deleteAgendamento', () => {
    it('should delete agendamento when id exists', async () => {
      // First, create a new agendamento
      const createDto: CreateAgendamentoDto = {
        agendamento: {
          medico: 'Dr. Test',
          paciente: 'Test Patient',
          data_horario: '2024-12-25 10:00'
        }
      };
      const created = await agendamentoService.createAgendamento(createDto);

      // Then delete it
      const result = await agendamentoService.deleteAgendamento(created.id);

      expect(result).toBe(true);

      // Verify it's deleted
      const found = await agendamentoService.getAgendamentoById(created.id);
      expect(found).toBeNull();
    });

    it('should return false when trying to delete non-existent agendamento', async () => {
      const result = await agendamentoService.deleteAgendamento('invalid-uuid');

      expect(result).toBe(false);
    });
  });
}); 