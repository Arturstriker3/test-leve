import { inject } from 'inversify';
import { Injectable } from '../../shared/decorators/injectable.decorator';
import { AgendaResponse } from '../interface/agenda-response.interface';
import { MedicoService } from '../../medico/service/medico.service';
import { TYPES } from '../../shared/types/container-types';
import { PaginationParams } from '../../shared/utils/pagination.util';

@Injectable()
export class AgendaService {
  constructor(
    @inject(TYPES.MedicoService) private readonly medicoService: MedicoService
  ) {}

  async getAgendas(paginationParams?: PaginationParams): Promise<AgendaResponse> {
    return await this.medicoService.getMedicos(paginationParams);
  }
} 