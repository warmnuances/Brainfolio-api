import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Profilev2 } from './profilev2.schema';


@Schema()
export class Userv2 extends Document {

  // A flag to check if the user is created in our DB
  @Prop()
  isCompleted: boolean;

  @Prop()
  fullname: string;

  @Prop({unique: true, required: true})
  uid: string;

  @Prop({unique: true, sparse: true})
  email: string;

  @Prop({unique: true, sparse: true})
  username: string;

  @Prop()
  visibility: string;

  @Prop()
  visibilityList: string[];

  @Prop()
  profile: Profilev2

}

export const Userv2Schema = SchemaFactory.createForClass(Userv2);