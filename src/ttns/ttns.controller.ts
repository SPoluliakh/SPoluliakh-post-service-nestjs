import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import { CreateTtnDto } from './dto/create-ttn.dto';
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

  @Post()
  create(@Body() createTtn: CreateTtnDto): Promise<Ttn> {
    return this.ttnsService.create(createTtn);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Ttn> {
    return this.ttnsService.remove(id);
  }
}
