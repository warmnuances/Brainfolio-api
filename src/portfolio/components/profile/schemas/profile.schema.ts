import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  username: String;
  
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  relevantLink: string;

  @Prop({ required: false })
  linkedIn: string;

  @Prop({ required: false })
  title: string;

  //Profile Image insert
  //Background Image insert
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);