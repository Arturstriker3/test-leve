import { CreateAgendamentoRequest } from '../agendamento/interface/agendamento.interface';

// Validação para criar agendamento
export const validateCreateAgendamento = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') {
    return 'Corpo da requisição inválido';
  }

  const request = data as CreateAgendamentoRequest;

  if (!request.agendamento || typeof request.agendamento !== 'object') {
    return 'Campo agendamento é obrigatório';
  }

  const { agendamento } = request;

  if (!agendamento.medico || typeof agendamento.medico !== 'string' || agendamento.medico.trim().length === 0) {
    return 'Nome do médico é obrigatório e deve ser uma string não vazia';
  }

  if (!agendamento.paciente || typeof agendamento.paciente !== 'string' || agendamento.paciente.trim().length === 0) {
    return 'Nome do paciente é obrigatório e deve ser uma string não vazia';
  }

  if (!agendamento.data_horario || typeof agendamento.data_horario !== 'string' || agendamento.data_horario.trim().length === 0) {
    return 'Data e horário são obrigatórios';
  }

  // Validar formato da data (YYYY-MM-DD HH:MM)
  const dataHorarioRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (!dataHorarioRegex.test(agendamento.data_horario)) {
    return 'Formato de data e horário inválido. Use o formato: YYYY-MM-DD HH:MM';
  }

  return null;
};

export const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}; 