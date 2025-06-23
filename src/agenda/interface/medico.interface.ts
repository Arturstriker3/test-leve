export interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

export interface MedicosResponse {
  medicos: Medico[];
} 