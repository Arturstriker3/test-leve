import { v4 as uuidv4 } from 'uuid';
import { Agendamento, AgendamentoFiltros, AgendamentoStatus } from '../interface/agendamento.interface';
import { CreateAgendamentoDTO, UpdateAgendamentoDTO } from '../dto/agendamento.dto';
import { agendamentoMocks } from '../mocks/agendamento.mocks';

export class AgendamentoService {
  private agendamentos: Agendamento[] = [...agendamentoMocks];

  async criarAgendamento(dadosAgendamento: CreateAgendamentoDTO): Promise<Agendamento> {
    const timestamp = new Date().toISOString();
    const novoAgendamento: Agendamento = {
      id: uuidv4(),
      agendaId: dadosAgendamento.agendaId,
      titulo: dadosAgendamento.titulo,
      descricao: dadosAgendamento.descricao || undefined,
      dataHora: dadosAgendamento.dataHora,
      duracao: dadosAgendamento.duracao ?? 30,
      status: AgendamentoStatus.AGENDADO,
      criadoEm: timestamp,
      atualizadoEm: timestamp,
    };

    this.agendamentos.push(novoAgendamento);
    return novoAgendamento;
  }

  async obterAgendamentoPorId(id: string): Promise<Agendamento | null> {
    const agendamento = this.agendamentos.find(a => a.id === id);
    return agendamento || null;
  }

  async listarAgendamentos(filtros?: AgendamentoFiltros): Promise<Agendamento[]> {
    let agendamentosFiltrados = [...this.agendamentos];

    if (filtros?.agendaId) {
      agendamentosFiltrados = agendamentosFiltrados.filter(agendamento =>
        agendamento.agendaId === filtros.agendaId
      );
    }

    if (filtros?.status) {
      agendamentosFiltrados = agendamentosFiltrados.filter(agendamento =>
        agendamento.status === filtros.status
      );
    }

    if (filtros?.dataInicio) {
      const dataInicio = new Date(filtros.dataInicio);
      agendamentosFiltrados = agendamentosFiltrados.filter(agendamento =>
        new Date(agendamento.dataHora) >= dataInicio
      );
    }

    if (filtros?.dataFim) {
      const dataFim = new Date(filtros.dataFim);
      agendamentosFiltrados = agendamentosFiltrados.filter(agendamento =>
        new Date(agendamento.dataHora) <= dataFim
      );
    }

    return agendamentosFiltrados.sort((a, b) => 
      new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );
  }

  async atualizarAgendamento(id: string, dadosAtualizacao: UpdateAgendamentoDTO): Promise<Agendamento | null> {
    const agendamentoIndex = this.agendamentos.findIndex(a => a.id === id);
    
    if (agendamentoIndex === -1) {
      return null;
    }

    const agendamentoExistente = this.agendamentos[agendamentoIndex]!;
    const agendamentoAtualizado: Agendamento = {
      id: agendamentoExistente.id,
      agendaId: agendamentoExistente.agendaId,
      titulo: dadosAtualizacao.titulo ?? agendamentoExistente.titulo,
      descricao: dadosAtualizacao.descricao ?? agendamentoExistente.descricao,
      dataHora: dadosAtualizacao.dataHora ?? agendamentoExistente.dataHora,
      duracao: dadosAtualizacao.duracao ?? agendamentoExistente.duracao,
      status: dadosAtualizacao.status ?? agendamentoExistente.status,
      criadoEm: agendamentoExistente.criadoEm,
      atualizadoEm: new Date().toISOString(),
    };

    this.agendamentos[agendamentoIndex] = agendamentoAtualizado;
    return agendamentoAtualizado;
  }

  async excluirAgendamento(id: string): Promise<boolean> {
    const agendamentoIndex = this.agendamentos.findIndex(a => a.id === id);
    
    if (agendamentoIndex === -1) {
      return false;
    }

    this.agendamentos.splice(agendamentoIndex, 1);
    return true;
  }

  async listarAgendamentosPorAgenda(agendaId: string): Promise<Agendamento[]> {
    return this.agendamentos
      .filter(agendamento => agendamento.agendaId === agendaId)
      .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
  }
} 