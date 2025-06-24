import { Injectable } from '../../shared/decorators/injectable.decorator';
import { AgendaResponse } from '../interface/agenda-response.interface';
import { medicosMock } from '../mocks/medicos.mock';

@Injectable()
export class AgendaService {
  async getAgendas(): Promise<AgendaResponse> {
    return {
      medicos: medicosMock
    };
  }
} 