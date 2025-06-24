import { Injectable } from '../../shared/decorators/injectable.decorator';
import { AgendaResponse } from '../interface/agenda-response.interface';
import { medicosMock } from '../mocks/medicos.mock';

@Injectable()
export class AgendaService {
  async getAgendas(): Promise<AgendaResponse> {
    // Simulando uma operação assíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          medicos: medicosMock
        });
      }, 100);
    });
  }
} 