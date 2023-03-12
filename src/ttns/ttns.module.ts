import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsController } from 'src/departments/departments.controller';
import { DepartmentsService } from 'src/departments/departments.service';
import {
  Department,
  DepartmentSchema,
} from 'src/departments/schemas/departments.shema';
import { Ttn, TtnSchema } from './schemas/ttns.schema';
import { TtnsController } from './ttns.controller';
import { TtnsService } from './ttns.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ttn.name, schema: TtnSchema }]),
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [TtnsController, DepartmentsController],
  providers: [TtnsService, DepartmentsService],
})
export class TtnsModule {}
