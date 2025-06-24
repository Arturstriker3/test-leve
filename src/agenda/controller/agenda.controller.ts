import { inject } from 'inversify';
import { Injectable } from '../../shared/decorators/injectable.decorator';
import { TYPES } from '../../shared/types/container-types';
import { AgendaService } from '../service/agenda.service';
import { ResponseBuilder } from '../../shared/utils/response-builder.util';
import { BaseResponse } from '../../shared/interfaces/base-response.interface';
import { AgendaResponse } from '../interface/agenda-response.interface';

@Injectable()
export class AgendaController {
  constructor(
    @inject(TYPES.AgendaService) private readonly agendaService: AgendaService
  ) {}

  async getAgendas(): Promise<BaseResponse<AgendaResponse>> {
    try {
      const agendas = await this.agendaService.getAgendas();
      return ResponseBuilder.success(agendas, 'Agendas retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve agendas';
      return ResponseBuilder.error(message);
    }
  }
} 