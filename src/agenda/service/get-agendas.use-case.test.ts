import 'reflect-metadata';
import { AgendaService } from './agenda.service';
import { AgendaResponse } from '../interface/agenda-response.interface';

describe('GetAgendasUseCase', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  describe('getAgendas', () => {
    it('should return agendas with correct structure', async () => {
      // Act
      const result: AgendaResponse = await agendaService.getAgendas();

      // Assert
      expect(result).toBeDefined();
      expect(result.medicos).toBeDefined();
      expect(Array.isArray(result.medicos)).toBe(true);
    });

    it('should return at least one medico', async () => {
      // Act
      const result = await agendaService.getAgendas();

      // Assert
      expect(result.medicos.length).toBeGreaterThan(0);
    });

    it('should return medicos with required properties', async () => {
      // Act
      const result = await agendaService.getAgendas();
      const medico = result.medicos[0];

      // Assert
      expect(medico).toHaveProperty('id');
      expect(medico).toHaveProperty('nome');
      expect(medico).toHaveProperty('especialidade');
      expect(medico).toHaveProperty('horarios_disponiveis');
    });

    it('should return medicos with correct data types', async () => {
      // Act
      const result = await agendaService.getAgendas();
      const medico = result.medicos[0]!;

      // Assert
      expect(medico).toBeDefined();
      expect(typeof medico.id).toBe('number');
      expect(typeof medico.nome).toBe('string');
      expect(typeof medico.especialidade).toBe('string');
      expect(Array.isArray(medico.horarios_disponiveis)).toBe(true);
    });

    it('should return medicos with valid horarios_disponiveis format', async () => {
      // Act
      const result = await agendaService.getAgendas();
      const medico = result.medicos[0]!;

      // Assert
      expect(medico).toBeDefined();
      expect(medico.horarios_disponiveis.length).toBeGreaterThan(0);
      medico.horarios_disponiveis.forEach(horario => {
        expect(typeof horario).toBe('string');
        expect(horario).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
      });
    });

    it('should return expected mock data', async () => {
      // Act
      const result = await agendaService.getAgendas();

      // Assert
      expect(result.medicos).toHaveLength(2);
      
      const drJoao = result.medicos.find(m => m.nome === "Dr. João Silva");
      const draMaria = result.medicos.find(m => m.nome === "Dra. Maria Souza");

      expect(drJoao).toBeDefined();
      expect(drJoao?.especialidade).toBe("Cardiologista");
      expect(drJoao?.horarios_disponiveis).toHaveLength(3);

      expect(draMaria).toBeDefined();
      expect(draMaria?.especialidade).toBe("Dermatologista");
      expect(draMaria?.horarios_disponiveis).toHaveLength(2);
    });

    it('should resolve within reasonable time', async () => {
      // Arrange
      const startTime = Date.now();

      // Act
      await agendaService.getAgendas();
      const endTime = Date.now();

      // Assert
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(200); // Should complete in less than 200ms
    });
  });
}); 