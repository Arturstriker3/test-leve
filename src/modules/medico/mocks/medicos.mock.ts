import { Medico } from '../interface/medico.interface';

export const medicosMock: Medico[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    nome: "Dr. João Silva",
    especialidade: "Cardiologista",
    horarios_disponiveis: [
      "2024-10-05 09:00",
      "2024-10-05 10:00",
      "2024-10-05 11:00"
    ]
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    nome: "Dra. Maria Souza",
    especialidade: "Dermatologista",
    horarios_disponiveis: [
      "2024-10-06 14:00",
      "2024-10-06 15:00"
    ]
  },
  {
    id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    nome: "Dr. Carlos Oliveira",
    especialidade: "Pediatra",
    horarios_disponiveis: [
      "2024-10-07 08:00",
      "2024-10-07 09:00",
      "2024-10-07 10:00",
      "2024-10-07 11:00"
    ]
  },
  {
    id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
    nome: "Dra. Ana Paula",
    especialidade: "Ginecologista",
    horarios_disponiveis: [
      "2024-10-08 13:00",
      "2024-10-08 14:00",
      "2024-10-08 15:00"
    ]
  },
  {
    id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    nome: "Dr. Roberto Santos",
    especialidade: "Ortopedista",
    horarios_disponiveis: [
      "2024-10-09 07:00",
      "2024-10-09 08:00"
    ]
  }
]; 