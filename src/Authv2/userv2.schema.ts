import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Userv2 extends Document {

  // A flag to check if the user is created in our DB
  @Prop()
  isCompleted: boolean;

  @Prop()
  fullname: string;

  @Prop({unique: true})
  uid: string;

  @Prop({unique: true})
  email: string;

  @Prop({unique: true})
  username: string;

  @Prop()
  visibility: string;

  @Prop()
  visibilitylist: string[];

}

export const Userv2Schema = SchemaFactory.createForClass(Userv2);