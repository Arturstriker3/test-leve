import { Medico } from '../interface/medico.interface';

export const medicosMocks: Medico[] = [
  {
    id: 1,
    nome: "Dr. João Silva",
    especialidade: "Cardiologista",
    horarios_disponiveis: [
      "2024-10-05 09:00",
      "2024-10-05 10:00",
      "2024-10-05 11:00",
      "2024-10-07 08:00",
      "2024-10-07 09:00",
      "2024-10-08 14:00",
      "2024-10-08 15:00"
    ]
  },
  {
    id: 2,
    nome: "Dra. Maria Souza",
    especialidade: "Dermatologista",
    horarios_disponiveis: [
      "2024-10-06 14:00",
      "2024-10-06 15:00",
      "2024-10-06 16:00",
      "2024-10-09 10:00",
      "2024-10-09 11:00"
    ]
  },
  {
    id: 3,
    nome: "Dr. Carlos Oliveira",
    especialidade: "Ortopedista",
    horarios_disponiveis: [
      "2024-10-05 13:00",
      "2024-10-05 14:00",
      "2024-10-07 16:00",
      "2024-10-07 17:00",
      "2024-10-08 09:00"
    ]
  },
  {
    id: 4,
    nome: "Dra. Ana Paula",
    especialidade: "Pediatra",
    horarios_disponiveis: [
      "2024-10-06 08:00",
      "2024-10-06 09:00",
      "2024-10-06 10:00",
      "2024-10-08 08:00",
      "2024-10-08 09:00",
      "2024-10-08 10:00"
    ]
  },
  {
    id: 5,
    nome: "Dr. Roberto Lima",
    especialidade: "Neurologista",
    horarios_disponiveis: [
      "2024-10-07 10:00",
      "2024-10-07 11:00",
      "2024-10-09 14:00",
      "2024-10-09 15:00",
      "2024-10-09 16:00"
    ]
  }
]; 