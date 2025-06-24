import { Medico } from '../../medico/interface/medico.interface';
import { PaginatedResponse } from '../../shared/interfaces/paginated-response.interface';

export interface AgendaResponse extends PaginatedResponse<Medico> {} 