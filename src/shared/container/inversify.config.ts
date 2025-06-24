import { Container } from 'inversify';
import { TYPES } from '../types/container-types';

const container = new Container();

// Services - Will be imported dynamically to avoid circular dependencies
container.bind(TYPES.AgendaService).to(require('../../agenda/service/agenda.service').AgendaService);

// Controllers - Will be imported dynamically to avoid circular dependencies
container.bind(TYPES.AgendaController).to(require('../../agenda/controller/agenda.controller').AgendaController);

export { container }; 