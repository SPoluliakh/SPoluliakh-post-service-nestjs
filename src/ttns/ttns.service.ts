import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTtnDto } from './dto/create-ttn.dto';
import { Ttn, TtnDocument } from './schemas/ttns.schema';

@Injectable()
export class TtnsService {
  constructor(@InjectModel(Ttn.name) private ttnModel: Model<TtnDocument>) {}

  async getAll(): Promise<Ttn[]> {
    return this.ttnModel.find().exec();
  }

  async getOne(id: string): Promise<Ttn> {
    return this.ttnModel.findById(id, { new: true });
  }

  async create(createTtn: CreateTtnDto): Promise<Ttn> {
    const newTtn = new this.ttnModel(createTtn);
    return newTtn.save();
  }

  async remove(id: string): Promise<Ttn> {
    return this.ttnModel.findByIdAndRemove(id);
  }
}
