import { inject } from 'inversify';
import { Injectable } from '../../shared/decorators/injectable.decorator';
import { TYPES } from '../../shared/types/container-types';
import { AgendaService } from '../service/agenda.service';
import { ResponseBuilder } from '../../shared/utils/response-builder.util';
import { PaginatedApiResponse } from '../../shared/interfaces/paginated-api-response.interface';
import { Medico } from '../../medico/interface/medico.interface';
import { PaginationParams } from '../../shared/utils/pagination.util';

@Injectable()
export class AgendaController {
  constructor(
    @inject(TYPES.AgendaService) private readonly agendaService: AgendaService
  ) {}

  async getAgendas(paginationParams?: PaginationParams): Promise<PaginatedApiResponse<Medico>> {
    try {
      const agendas = await this.agendaService.getAgendas(paginationParams);
      return ResponseBuilder.successPaginated(agendas, 'Agendas retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve agendas';
      return ResponseBuilder.error(message) as any;
    }
  }
} 