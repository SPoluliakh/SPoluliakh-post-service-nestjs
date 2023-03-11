import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ttn, TtnSchema } from './schemas/ttns.schema';
import { TtnsController } from './ttns.controller';
import { TtnsService } from './ttns.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ttn.name, schema: TtnSchema }])],
  controllers: [TtnsController],
  providers: [TtnsService],
})
export class TtnsModule {}
