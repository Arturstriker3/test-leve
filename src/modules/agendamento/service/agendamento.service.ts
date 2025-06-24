import { Injectable } from '../../shared/decorators/injectable.decorator';
import { Agendamento } from '../interface/agendamento.interface';
import { agendamentosMock } from '../mocks/agendamentos.mock';
import { CreateAgendamentoDto } from '../dto/create-agendamento.dto';
import { PaginatedResponse } from '../../shared/interfaces/paginated-response.interface';
import { PaginationUtil, PaginationParams } from '../../shared/utils/pagination.util';
import { v4 as uuidv4 } from 'uuid';

export interface AgendamentoFilters {
  id?: string;
  medico?: string;
  paciente?: string;
  data_horario?: string;
}

@Injectable()
export class AgendamentoService {
  private agendamentos: Agendamento[] = [...agendamentosMock];

  async createAgendamento(createAgendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {
    const { agendamento } = createAgendamentoDto;
    
    const newAgendamento: Agendamento = {
      id: uuidv4(),
      medico: agendamento.medico,
      paciente: agendamento.paciente,
      data_horario: agendamento.data_horario,
      created_at: new Date().toISOString()
    };

    this.agendamentos.push(newAgendamento);
    return newAgendamento;
  }

  async getAgendamentos(
    paginationParams?: PaginationParams,
    filters?: AgendamentoFilters
  ): Promise<PaginatedResponse<Agendamento>> {
    let filteredAgendamentos = [...this.agendamentos];

    if (filters) {
      if (filters.id) {
        filteredAgendamentos = filteredAgendamentos.filter(a => a.id === filters.id);
      }
      if (filters.medico) {
        filteredAgendamentos = filteredAgendamentos.filter(a => 
          a.medico.toLowerCase().includes(filters.medico!.toLowerCase())
        );
      }
      if (filters.paciente) {
        filteredAgendamentos = filteredAgendamentos.filter(a => 
          a.paciente.toLowerCase().includes(filters.paciente!.toLowerCase())
        );
      }
      if (filters.data_horario) {
        filteredAgendamentos = filteredAgendamentos.filter(a => 
          a.data_horario.includes(filters.data_horario!)
        );
      }
    }

    return PaginationUtil.paginate(filteredAgendamentos, paginationParams);
  }

  async getAgendamentoById(id: string): Promise<Agendamento | null> {
    const agendamento = this.agendamentos.find(a => a.id === id);
    return agendamento || null;
  }

  async deleteAgendamento(id: string): Promise<boolean> {
    const index = this.agendamentos.findIndex(a => a.id === id);
    if (index === -1) {
      return false;
    }
    this.agendamentos.splice(index, 1);
    return true;
  }
} 