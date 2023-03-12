import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ versionKey: false, timestamps: true })
export class Department {
  @Prop()
  CityDescription: string;

  @Prop()
  Description: string;

  @Prop()
  id: string;

  @Prop({ type: Object })
  ReceivingLimitationsOnDimensions: {
    Height: string;
    Length: string;
    Width: string;
  };

  @Prop({ type: Object })
  Schedule: {
    Friday: string;
    Monday: string;
    Saturday: string;
    Sunday: string;
    Thursday: string;
    Tuesday: string;
    Wednesday: string;
  };
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
