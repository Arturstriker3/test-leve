export interface Agenda {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface AgendaFiltros {
  nome?: string;
  ativo?: boolean;
} 