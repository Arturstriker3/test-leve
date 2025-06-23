import { Agenda } from '../interface/agenda.interface';

export const agendaMocks: Agenda[] = [
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    nome: 'Agenda Médica',
    descricao: 'Agenda para consultas médicas gerais',
    ativo: true,
    criadoEm: '2024-01-15T10:30:00Z',
    atualizadoEm: '2024-01-15T10:30:00Z',
  },
  {
    id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
    nome: 'Agenda Odontológica',
    descricao: 'Agenda para procedimentos odontológicos',
    ativo: true,
    criadoEm: '2024-01-16T14:20:00Z',
    atualizadoEm: '2024-01-16T14:20:00Z',
  },
  {
    id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
    nome: 'Agenda Fisioterapia',
    descricao: 'Agenda para sessões de fisioterapia',
    ativo: false,
    criadoEm: '2024-01-10T09:15:00Z',
    atualizadoEm: '2024-01-17T16:45:00Z',
  },
  {
    id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
    nome: 'Agenda Psicologia',
    descricao: 'Agenda para atendimentos psicológicos',
    ativo: true,
    criadoEm: '2024-01-12T11:00:00Z',
    atualizadoEm: '2024-01-12T11:00:00Z',
  },
  {
    id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
    nome: 'Agenda Pediatria',
    descricao: 'Agenda especializada em atendimento pediátrico',
    ativo: true,
    criadoEm: '2024-01-08T08:30:00Z',
    atualizadoEm: '2024-01-14T13:20:00Z',
  },
]; 