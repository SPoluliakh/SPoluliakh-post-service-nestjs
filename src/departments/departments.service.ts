import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Department, DepartmentDocument } from './schemas/departments.shema';
import { GetDepartmentDto } from './dto/get-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async getDepartment(
    body: GetDepartmentDto,
    query: { page: number; limit: number },
  ): Promise<Department[]> {
    try {
      const { cityName = '', id = '' } = body;

      const { page = 1, limit = 20 } = query;
      const skip: number = (page - 1) * limit;

      let findParams: unknown;

      if (cityName !== '' && id !== '') {
        findParams = { cityName, id };
      } else if (cityName !== '' && id === '') {
        findParams = { cityName };
      } else if (cityName === '' && id !== '') {
        findParams = { id };
      } else if (cityName === '' && id === '') {
        const npData = await axios.post(
          `https://api.novaposhta.ua/v2.0/json/`,
          {
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
              CityName: cityName,
              Page: page.toString(),
              Limit: '20',
              WarehouseId: id,
            },
          },
        );
        return npData.data;
      }

      //   console.log('--------------', findParams);
      const isInDb = await this.departmentModel
        .find({ findParams }, '-createdAt -updatedAt', {
          skip,
          limit: +limit,
        })
        .exec();
      if (isInDb.length) {
        return isInDb;
      }

      const npData = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: cityName,
          Page: page.toString(),
          Limit: '20',
          WarehouseId: id,
        },
      });
      console.log('-------------', npData.data);
      //   const newTtn = new this.departmentModel({
      //     cityName: npData.data.data[0].Number,
      //     description: npData.data.data[0].Status,

      //     dimensions: npData.data.data[0].WarehouseSender,
      //     schedule: npData.data.data[0].WarehouseSenderAddress,
      //   });
      //   return await newTtn.save();
    } catch (err) {
      throw err;
    }
  }
}
