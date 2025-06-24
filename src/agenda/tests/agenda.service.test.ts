import 'reflect-metadata';
import { AgendaService } from '../service/agenda.service';

describe('AgendaService', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  it('should return agendas with médicos', async () => {
    const result = await agendaService.getAgendas();
    
    expect(result).toBeDefined();
    expect(result.medicos).toBeDefined();
    expect(Array.isArray(result.medicos)).toBe(true);
    expect(result.medicos.length).toBeGreaterThan(0);
  });

  it('should return médicos with correct structure', async () => {
    const result = await agendaService.getAgendas();
    const medico = result.medicos[0];
    
    expect(medico).toHaveProperty('id');
    expect(medico).toHaveProperty('nome');
    expect(medico).toHaveProperty('especialidade');
    expect(medico).toHaveProperty('horarios_disponiveis');
    expect(Array.isArray(medico.horarios_disponiveis)).toBe(true);
  });
}); 