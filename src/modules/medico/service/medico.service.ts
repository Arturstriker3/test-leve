import { Injectable } from '../../shared/decorators/injectable.decorator';
import { Medico } from '../interface/medico.interface';
import { medicosMock } from '../mocks/medicos.mock';
import { PaginatedResponse } from '../../shared/interfaces/paginated-response.interface';
import { PaginationUtil, PaginationParams } from '../../shared/utils/pagination.util';
import { FilterUtil } from '../../shared/utils/filter.util';
import { MedicoEntity } from '../entities/medico.entity';

export interface MedicoFilters {
  especialidade?: string;
}

@Injectable()
export class MedicoService {
  async getMedicos(
    paginationParams?: PaginationParams,
    filters?: MedicoFilters
  ): Promise<PaginatedResponse<Medico>> {
    let filteredData = medicosMock;
    
    // Apply filters if provided
    if (filters && Object.keys(filters).length > 0) {
      filteredData = FilterUtil.applyFiltersWithEntity(
        medicosMock,
        filters,
        MedicoEntity
      );
    }
    
    return PaginationUtil.paginate(filteredData, paginationParams);
  }

  async getMedicoById(id: string): Promise<Medico | null> {
    const medico = medicosMock.find(m => m.id === id);
    return medico || null;
  }

  async getMedicosByEspecialidade(especialidade: string): Promise<Medico[]> {
    return medicosMock.filter(m => 
      m.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  }
} 