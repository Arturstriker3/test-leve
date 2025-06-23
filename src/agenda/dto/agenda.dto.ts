export interface CreateAgendaDTO {
  nome: string;
  descricao: string;
  ativo?: boolean;
}

export interface UpdateAgendaDTO {
  nome?: string;
  descricao?: string;
  ativo?: boolean;
}

export interface AgendaResponseDTO {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
} 