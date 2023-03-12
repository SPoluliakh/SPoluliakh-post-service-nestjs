import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TtnsModule } from './ttns/ttns.module';
import { DepartmentsModule } from './departments/departments.module';

dotenv.config();
const { DB_HOST } = process.env;
console.log('DB_HOST:', DB_HOST);

@Module({
  imports: [TtnsModule, DepartmentsModule, MongooseModule.forRoot(DB_HOST)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'AXIOS_INSTANCE',
      useValue: axios.create({
        baseURL: 'https://api.novaposhta.ua/v2.0/json/',
      }),
    },
  ],
})
export class AppModule {}
