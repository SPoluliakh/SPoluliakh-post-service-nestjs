import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ versionKey: false, timestamps: true })
export class Department {
  @Prop()
  cityName: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  dimensions: { Height: string; Length: string; Width: string };

  @Prop({ type: Object })
  schedule: {
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
