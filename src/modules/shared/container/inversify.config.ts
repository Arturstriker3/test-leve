import { Container } from 'inversify';
import { TYPES } from '../types/container-types';

const container = new Container();

// Services - Will be imported dynamically to avoid circular dependencies
container.bind(TYPES.MedicoService).to(require('../../medico/service/medico.service').MedicoService);
container.bind(TYPES.AgendaService).to(require('../../agenda/service/agenda.service').AgendaService);
container.bind(TYPES.AgendamentoService).to(require('../../agendamento/service/agendamento.service').AgendamentoService);

// Controllers - Will be imported dynamically to avoid circular dependencies
container.bind(TYPES.AgendaController).to(require('../../agenda/controller/agenda.controller').AgendaController);
container.bind(TYPES.MedicoController).to(require('../../medico/controller/medico.controller').MedicoController);
container.bind(TYPES.AgendamentoController).to(require('../../agendamento/controller/agendamento.controller').AgendamentoController);

export { container }; 