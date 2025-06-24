import { inject } from 'inversify';
import { Injectable } from '../../shared/decorators/injectable.decorator';
import { TYPES } from '../../shared/types/container-types';
import { AgendamentoService, AgendamentoFilters } from '../service/agendamento.service';
import { ResponseBuilder } from '../../shared/utils/response-builder.util';
import { PaginatedApiResponse } from '../../shared/interfaces/paginated-api-response.interface';
import { Agendamento } from '../interface/agendamento.interface';
import { PaginationParams } from '../../shared/utils/pagination.util';
import { BaseResponse } from '../../shared/interfaces/base-response.interface';
import { FilterUtil } from '../../shared/utils/filter.util';
import { AgendamentoFilterDto } from '../dto/agendamento-filter.dto';
import { AgendamentoEntity } from '../entities/agendamento.entity';
import { CreateAgendamentoDto } from '../dto/create-agendamento.dto';
import { ValidationUtil } from '../../shared/utils/validation.util';

@Injectable()
export class AgendamentoController {
  constructor(
    @inject(TYPES.AgendamentoService) private readonly agendamentoService: AgendamentoService
  ) {}

  async createAgendamento(body: any): Promise<BaseResponse<Agendamento>> {
    try {
      // Validate the request body
      const validation = await ValidationUtil.validateQueryParams(CreateAgendamentoDto, body);
      
      if (!validation.isValid) {
        return validation.response!;
      }

      const createAgendamentoDto = validation.data as CreateAgendamentoDto;
      const agendamento = await this.agendamentoService.createAgendamento(createAgendamentoDto);
      
      return ResponseBuilder.success(agendamento, 'Agendamento created successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create agendamento';
      return ResponseBuilder.error(message);
    }
  }

  async getAgendamentos(
    paginationParams?: PaginationParams,
    queryParams?: any
  ): Promise<PaginatedApiResponse<Agendamento>> {
    try {
      // Validate filters using Entity
      const filterValidation = await FilterUtil.validateFiltersWithEntity(
        AgendamentoFilterDto,
        queryParams || {},
        AgendamentoEntity
      );

      if (!filterValidation.isValid) {
        return filterValidation.response as any;
      }

      const filters: AgendamentoFilters = filterValidation.data || {};
      const agendamentos = await this.agendamentoService.getAgendamentos(paginationParams, filters);
      return ResponseBuilder.successPaginated(agendamentos, 'Agendamentos retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve agendamentos';
      return ResponseBuilder.error(message) as any;
    }
  }

  async getAgendamentoById(id: string): Promise<BaseResponse<Agendamento | null>> {
    try {
      const agendamento = await this.agendamentoService.getAgendamentoById(id);
      if (!agendamento) {
        return ResponseBuilder.error('Agendamento not found');
      }
      return ResponseBuilder.success(agendamento, 'Agendamento retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve agendamento';
      return ResponseBuilder.error(message);
    }
  }

  async deleteAgendamento(id: string): Promise<BaseResponse<{ deleted: boolean }>> {
    try {
      const deleted = await this.agendamentoService.deleteAgendamento(id);
      if (!deleted) {
        return ResponseBuilder.error('Agendamento not found');
      }
      return ResponseBuilder.success({ deleted: true }, 'Agendamento deleted successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete agendamento';
      return ResponseBuilder.error(message);
    }
  }
} 