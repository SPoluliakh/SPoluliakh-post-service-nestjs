import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TtnDocument = Ttn & Document;

@Schema({ versionKey: false, timestamps: true })
export class Ttn {
  @Prop()
  ttn: string;

  @Prop()
  status: string;

  @Prop()
  sender: string;

  @Prop()
  senderAdress: string;

  @Prop()
  recipient: string;

  @Prop()
  recipientAdress: string;
}

export const TtnSchema = SchemaFactory.createForClass(Ttn);
