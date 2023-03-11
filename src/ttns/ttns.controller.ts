import { Controller } from '@nestjs/common';
import { Delete, Get, Param } from '@nestjs/common/decorators';

import { Ttn } from './schemas/ttns.schema';
import { TtnsService } from './ttns.service';

@Controller('ttns')
export class TtnsController {
  constructor(private readonly ttnsService: TtnsService) {}

  @Get()
  getAll(): Promise<Ttn[]> {
    return this.ttnsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Ttn> {
    return this.ttnsService.getOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Ttn> {
    return this.ttnsService.remove(id);
  }
}
