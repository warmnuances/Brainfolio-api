import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profilev2 extends Document {
  
  @Prop({ required: false })
  displayEmail: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  title: string;
  
  @Prop()
  isPublic: boolean;

  @Prop()
  profileImage: string;

  @Prop()
  backgroundImage: string;

  @Prop()
  github: string;

  @Prop()
  linkedin: string;
  
}

export const Profilev2Schema = SchemaFactory.createForClass(Profilev2);