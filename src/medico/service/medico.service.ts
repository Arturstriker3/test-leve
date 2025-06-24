import { Injectable } from '../../shared/decorators/injectable.decorator';
import { Medico } from '../interface/medico.interface';
import { medicosMock } from '../mocks/medicos.mock';
import { PaginatedResponse } from '../../shared/interfaces/paginated-response.interface';
import { PaginationUtil, PaginationParams } from '../../shared/utils/pagination.util';

@Injectable()
export class MedicoService {
  async getMedicos(paginationParams?: PaginationParams): Promise<PaginatedResponse<Medico>> {
    return PaginationUtil.paginate(medicosMock, paginationParams);
  }

  async getMedicoById(id: number): Promise<Medico | null> {
    const medico = medicosMock.find(m => m.id === id);
    return medico || null;
  }

  async getMedicosByEspecialidade(especialidade: string): Promise<Medico[]> {
    return medicosMock.filter(m => 
      m.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  }
} 