import { v4 as uuidv4 } from 'uuid';
import { Agenda, AgendaFiltros } from '../interface/agenda.interface';
import { CreateAgendaDTO, UpdateAgendaDTO } from '../dto/agenda.dto';
import { agendaMocks } from '../mocks/agenda.mocks';

export class AgendaService {
  private agendas: Agenda[] = [...agendaMocks];

  async criarAgenda(dadosAgenda: CreateAgendaDTO): Promise<Agenda> {
    const timestamp = new Date().toISOString();
    const novaAgenda: Agenda = {
      id: uuidv4(),
      nome: dadosAgenda.nome,
      descricao: dadosAgenda.descricao,
      ativo: dadosAgenda.ativo ?? true,
      criadoEm: timestamp,
      atualizadoEm: timestamp,
    };

    this.agendas.push(novaAgenda);
    return novaAgenda;
  }

  async obterAgendaPorId(id: string): Promise<Agenda | null> {
    const agenda = this.agendas.find(a => a.id === id);
    return agenda || null;
  }

  async listarAgendas(filtros?: AgendaFiltros): Promise<Agenda[]> {
    let agendasFiltradas = [...this.agendas];

    if (filtros?.nome) {
      agendasFiltradas = agendasFiltradas.filter(agenda =>
        agenda.nome.toLowerCase().includes(filtros.nome!.toLowerCase())
      );
    }

    if (filtros?.ativo !== undefined) {
      agendasFiltradas = agendasFiltradas.filter(agenda => agenda.ativo === filtros.ativo);
    }

    return agendasFiltradas;
  }

  async atualizarAgenda(id: string, dadosAtualizacao: UpdateAgendaDTO): Promise<Agenda | null> {
    const agendaIndex = this.agendas.findIndex(a => a.id === id);
    
    if (agendaIndex === -1) {
      return null;
    }

    const agendaExistente = this.agendas[agendaIndex]!;
    const agendaAtualizada: Agenda = {
      id: agendaExistente.id,
      nome: dadosAtualizacao.nome ?? agendaExistente.nome,
      descricao: dadosAtualizacao.descricao ?? agendaExistente.descricao,
      ativo: dadosAtualizacao.ativo ?? agendaExistente.ativo,
      criadoEm: agendaExistente.criadoEm,
      atualizadoEm: new Date().toISOString(),
    };

    this.agendas[agendaIndex] = agendaAtualizada;
    return agendaAtualizada;
  }

  async excluirAgenda(id: string): Promise<boolean> {
    const agendaIndex = this.agendas.findIndex(a => a.id === id);
    
    if (agendaIndex === -1) {
      return false;
    }

    this.agendas.splice(agendaIndex, 1);
    return true;
  }
} 