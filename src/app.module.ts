import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TtnsModule } from './ttns/ttns.module';

dotenv.config();
const { DB_HOST } = process.env;
console.log('DB_HOST:', DB_HOST);

@Module({
  imports: [TtnsModule, MongooseModule.forRoot(DB_HOST)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
