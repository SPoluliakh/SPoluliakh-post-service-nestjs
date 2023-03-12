import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './schemas/departments.shema';
import { getNpData } from '../helpers/departments.axios';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async getDepartment(query: {
    page: number;
    limit: number;
    cityName: string;
    id: string;
  }): Promise<{ data: Department[]; info: { totalCount: number } }> {
    try {
      const { page = 1, limit = 20, cityName, id } = query;
      const skip: number = (page - 1) * limit;

      //Since a free database is used for educational purposes,
      // in order not to load it with large calculations, we save it only
      // if the search occurs by the city name and branch number at the same time,
      // if necessary, we can modify the code to save different options or all existing branches.

      if (cityName !== '' && id !== '') {
        const isInDb = await this.departmentModel.find(
          { CityDescription: cityName.toUpperCase(), id },
          '-createdAt -updatedAt',
          {
            skip,
            limit: +limit,
          },
        );
        if (isInDb.length) {
          return { data: isInDb, info: { totalCount: isInDb.length } };
        }

        const data = await getNpData(cityName, page.toString(), id);

        if (data.info.totalCount !== 0) {
          data.data.forEach(async (element: any) => {
            const newTtn = new this.departmentModel({
              CityDescription: element.CityDescription.toUpperCase(),
              id: element.Number,
              Description: element.Description,
              ReceivingLimitationsOnDimensions:
                element.SendingLimitationsOnDimensions,
              Schedule: element.Schedule,
            });
            await newTtn.save();
          });
        }

        return data;
      }

      const data = await getNpData(cityName, page.toString(), id);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
