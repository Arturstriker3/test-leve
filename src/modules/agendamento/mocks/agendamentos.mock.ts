import { Agendamento } from '../interface/agendamento.interface';

export const agendamentosMock: Agendamento[] = [
  {
    id: 'a1b2c3d4-5e6f-7890-abcd-ef1234567890',
    medico: 'Dr. João Silva',
    paciente: 'Carlos Almeida',
    data_horario: '2024-10-05 09:00',
    created_at: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'b2c3d4e5-6f78-9012-bcde-f23456789012',
    medico: 'Dra. Maria Souza',
    paciente: 'Ana Santos',
    data_horario: '2024-10-06 14:00',
    created_at: '2024-01-15T11:45:00.000Z'
  },
  {
    id: 'c3d4e5f6-7890-1234-cdef-345678901234',
    medico: 'Dr. Carlos Oliveira',
    paciente: 'Pedro Lima',
    data_horario: '2024-10-07 08:00',
    created_at: '2024-01-15T14:20:00.000Z'
  }
]; 