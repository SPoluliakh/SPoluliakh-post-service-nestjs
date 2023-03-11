import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Ttn, TtnDocument } from './schemas/ttns.schema';

@Injectable()
export class TtnsService {
  constructor(@InjectModel(Ttn.name) private ttnModel: Model<TtnDocument>) {}

  async getAll(): Promise<Ttn[]> {
    try {
      return this.ttnModel.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async getOne(ttn: string): Promise<Ttn> {
    try {
      const isInDb = await this.ttnModel.findOne({ ttn }).exec();
      if (isInDb) {
        return isInDb;
      }

      const npData = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
        modelName: 'TrackingDocument',
        calledMethod: 'getStatusDocuments',
        methodProperties: {
          Documents: [
            {
              DocumentNumber: ttn,
            },
          ],
        },
      });

      const newTtn = new this.ttnModel({
        ttn: npData.data.data[0].Number,
        status: npData.data.data[0].Status,

        sender: npData.data.data[0].WarehouseSender,
        senderAdress: npData.data.data[0].WarehouseSenderAddress,

        recipient: npData.data.data[0].WarehouseRecipient,
        recipientAdress: npData.data.data[0].WarehouseRecipientAddress,
      });
      return newTtn.save();
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Ttn> {
    try {
      return this.ttnModel.findByIdAndRemove(id);
    } catch (err) {
      throw err;
    }
  }
}
