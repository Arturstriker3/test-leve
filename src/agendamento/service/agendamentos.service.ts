import { AgendamentoData, AgendamentoResponse } from '../interface/agendamento.interface';
import { agendamentosCriados } from '../mocks/agendamentos.mocks';
import { MedicosService } from '../../agenda/service/medicos.service';

export class AgendamentosService {
  private medicosService: MedicosService;

  constructor() {
    this.medicosService = new MedicosService();
  }

  async criarAgendamento(agendamento: AgendamentoData): Promise<AgendamentoResponse | null> {
    // Verificar se o médico existe e o horário está disponível
    const disponivel = this.medicosService.verificarDisponibilidade(
      agendamento.medico,
      agendamento.data_horario
    );

    if (!disponivel) {
      return null;
    }

    // Remover o horário da lista de disponíveis
    this.medicosService.removerHorarioDisponivel(
      agendamento.medico,
      agendamento.data_horario
    );

    // Adicionar o agendamento à lista
    agendamentosCriados.push(agendamento);

    return {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: agendamento
    };
  }
} 