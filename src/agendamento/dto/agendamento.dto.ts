import { AgendamentoStatus } from '../interface/agendamento.interface';

export interface CreateAgendamentoDTO {
  agendaId: string;
  titulo: string;
  descricao?: string;
  dataHora: string;
  duracao?: number;
}

export interface UpdateAgendamentoDTO {
  titulo?: string;
  descricao?: string;
  dataHora?: string;
  duracao?: number;
  status?: AgendamentoStatus;
}

export interface AgendamentoResponseDTO {
  id: string;
  agendaId: string;
  titulo: string;
  descricao?: string;
  dataHora: string;
  duracao: number;
  status: AgendamentoStatus;
  criadoEm: string;
  atualizadoEm: string;
} 