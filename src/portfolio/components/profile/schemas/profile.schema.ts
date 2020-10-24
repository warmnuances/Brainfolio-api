import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  username: String;
  
  @Prop({ required: false })
  fullName: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  relevantLink: string;

  @Prop({ required: false })
  linkedIn: string;

  @Prop({ required: false })
  title: string;
  
  @Prop()
  isPublic: boolean;

  @Prop()
  dark: boolean;

  @Prop()
  profileImageName: [string];

  @Prop()
  backgroundImageName: [string];
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);