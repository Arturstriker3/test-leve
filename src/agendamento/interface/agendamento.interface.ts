export interface AgendamentoData {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface CreateAgendamentoRequest {
  agendamento: AgendamentoData;
}

export interface AgendamentoResponse {
  mensagem: string;
  agendamento: AgendamentoData;
} 