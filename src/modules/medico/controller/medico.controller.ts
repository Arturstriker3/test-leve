import { inject } from 'inversify';
import { Injectable } from '../../shared/decorators/injectable.decorator';
import { TYPES } from '../../shared/types/container-types';
import { MedicoService, MedicoFilters } from '../service/medico.service';
import { ResponseBuilder } from '../../shared/utils/response-builder.util';
import { PaginatedApiResponse } from '../../shared/interfaces/paginated-api-response.interface';
import { Medico } from '../interface/medico.interface';
import { PaginationParams } from '../../shared/utils/pagination.util';
import { BaseResponse } from '../../shared/interfaces/base-response.interface';
import { FilterUtil } from '../../shared/utils/filter.util';
import { MedicoFilterDto } from '../dto/medico-filter.dto';
import { MedicoEntity } from '../entities/medico.entity';

@Injectable()
export class MedicoController {
  constructor(
    @inject(TYPES.MedicoService) private readonly medicoService: MedicoService
  ) {}

  async getMedicos(
    paginationParams?: PaginationParams,
    queryParams?: any
  ): Promise<PaginatedApiResponse<Medico>> {
    try {
      // Validate filters using Entity
      const filterValidation = await FilterUtil.validateFiltersWithEntity(
        MedicoFilterDto,
        queryParams || {},
        MedicoEntity
      );

      if (!filterValidation.isValid) {
        return filterValidation.response as any;
      }

      const filters: MedicoFilters = filterValidation.data || {};
      const medicos = await this.medicoService.getMedicos(paginationParams, filters);
      return ResponseBuilder.successPaginated(medicos, 'Medicos retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve medicos';
      return ResponseBuilder.error(message) as any;
    }
  }

  async getMedicoById(id: number): Promise<BaseResponse<Medico | null>> {
    try {
      const medico = await this.medicoService.getMedicoById(id);
      if (!medico) {
        return ResponseBuilder.error('Medico not found');
      }
      return ResponseBuilder.success(medico, 'Medico retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve medico';
      return ResponseBuilder.error(message);
    }
  }

  async getMedicosByEspecialidade(especialidade: string): Promise<BaseResponse<Medico[]>> {
    try {
      const medicos = await this.medicoService.getMedicosByEspecialidade(especialidade);
      return ResponseBuilder.success(medicos, 'Medicos by especialidade retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve medicos by especialidade';
      return ResponseBuilder.error(message);
    }
  }
} 