import { Body, Get, Query } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { Department } from './schemas/departments.shema';
import { DepartmentsService } from './departments.service';
import { GetDepartmentDto } from './dto/get-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  getDepartments(
    @Body() body: GetDepartmentDto,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<Department[]> {
    return this.departmentsService.getDepartment(body, { page, limit });
  }
}
