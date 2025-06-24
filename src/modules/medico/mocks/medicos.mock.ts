import { Medico } from '../interface/medico.interface';

export const medicosMock: Medico[] = [
  {
    id: 1,
    nome: "Dr. João Silva",
    especialidade: "Cardiologista",
    horarios_disponiveis: [
      "2024-10-05 09:00",
      "2024-10-05 10:00",
      "2024-10-05 11:00"
    ]
  },
  {
    id: 2,
    nome: "Dra. Maria Souza",
    especialidade: "Dermatologista",
    horarios_disponiveis: [
      "2024-10-06 14:00",
      "2024-10-06 15:00"
    ]
  },
  {
    id: 3,
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
    id: 4,
    nome: "Dra. Ana Paula",
    especialidade: "Ginecologista",
    horarios_disponiveis: [
      "2024-10-08 13:00",
      "2024-10-08 14:00",
      "2024-10-08 15:00"
    ]
  },
  {
    id: 5,
    nome: "Dr. Roberto Santos",
    especialidade: "Ortopedista",
    horarios_disponiveis: [
      "2024-10-09 07:00",
      "2024-10-09 08:00"
    ]
  }
]; 