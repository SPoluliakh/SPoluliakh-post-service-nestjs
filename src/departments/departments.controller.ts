import { Get, Query } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { Department } from './schemas/departments.shema';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  getDepartments(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('cityName') cityName: string,
    @Query('id') id: string,
  ): Promise<{ data: Department[]; info: { totalCount: number } }> {
    return this.departmentsService.getDepartment({
      page,
      limit,
      cityName,
      id,
    });
  }
}
