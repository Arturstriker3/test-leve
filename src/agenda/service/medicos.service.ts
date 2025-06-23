import { Medico, MedicosResponse } from '../interface/medico.interface';
import { medicosMocks } from '../mocks/medicos.mocks';

export class MedicosService {
  private medicos: Medico[] = [...medicosMocks];

  async listarMedicos(): Promise<MedicosResponse> {
    return {
      medicos: this.medicos
    };
  }

  // Método para remover horário quando um agendamento for feito
  removerHorarioDisponivel(nomeMedico: string, dataHorario: string): boolean {
    const medico = this.medicos.find(m => m.nome === nomeMedico);
    
    if (!medico) {
      return false;
    }

    const horarioIndex = medico.horarios_disponiveis.indexOf(dataHorario);
    
    if (horarioIndex === -1) {
      return false;
    }

    medico.horarios_disponiveis.splice(horarioIndex, 1);
    return true;
  }

  // Verificar se médico existe e horário está disponível
  verificarDisponibilidade(nomeMedico: string, dataHorario: string): boolean {
    const medico = this.medicos.find(m => m.nome === nomeMedico);
    
    if (!medico) {
      return false;
    }

    return medico.horarios_disponiveis.includes(dataHorario);
  }
} 