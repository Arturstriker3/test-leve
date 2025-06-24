import 'reflect-metadata';
import { MedicoService } from './medico.service';
import { PaginationParams } from '../../shared/utils/pagination.util';

describe('MedicoService Use Cases', () => {
  let medicoService: MedicoService;

  beforeEach(() => {
    medicoService = new MedicoService();
  });

  describe('getMedicos', () => {
    it('should return paginated medicos with default pagination', async () => {
      const result = await medicoService.getMedicos();
      
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.current_page).toBe(1);
      expect(result.pagination.per_page).toBe(10);
    });

    it('should return paginated medicos with custom pagination', async () => {
      const params: PaginationParams = { page: 1, limit: 2 };
      const result = await medicoService.getMedicos(params);
      
      expect(result.data).toHaveLength(2);
      expect(result.pagination.current_page).toBe(1);
      expect(result.pagination.per_page).toBe(2);
      expect(result.pagination.total).toBe(5);
      expect(result.pagination.total_pages).toBe(3);
    });

    it('should handle pagination correctly for second page', async () => {
      const params: PaginationParams = { page: 2, limit: 2 };
      const result = await medicoService.getMedicos(params);
      
      expect(result.data).toHaveLength(2);
      expect(result.pagination.current_page).toBe(2);
      expect(result.pagination.has_previous_page).toBe(true);
      expect(result.pagination.has_next_page).toBe(true);
    });
  });

  describe('getMedicoById', () => {
    it('should return medico when id exists', async () => {
      const result = await medicoService.getMedicoById('f47ac10b-58cc-4372-a567-0e02b2c3d479');
      
      expect(result).toBeDefined();
      expect(result?.id).toBe('f47ac10b-58cc-4372-a567-0e02b2c3d479');
      expect(result?.nome).toBe("Dr. João Silva");
    });

    it('should return null when id does not exist', async () => {
      const result = await medicoService.getMedicoById('invalid-uuid');
      
      expect(result).toBeNull();
    });
  });

  describe('getMedicosByEspecialidade', () => {
    it('should return medicos by exact especialidade', async () => {
      const result = await medicoService.getMedicosByEspecialidade('Cardiologista');
      
      expect(result).toHaveLength(1);
      expect(result[0]?.especialidade).toBe('Cardiologista');
    });

    it('should return medicos by partial especialidade match', async () => {
      const result = await medicoService.getMedicosByEspecialidade('card');
      
      expect(result).toHaveLength(1);
      expect(result[0]?.especialidade).toBe('Cardiologista');
    });

    it('should return empty array when especialidade not found', async () => {
      const result = await medicoService.getMedicosByEspecialidade('Neurologia');
      
      expect(result).toHaveLength(0);
    });

    it('should be case insensitive', async () => {
      const result = await medicoService.getMedicosByEspecialidade('PEDIATRA');
      
      expect(result).toHaveLength(1);
      expect(result[0]?.especialidade).toBe('Pediatra');
    });
  });
}); 