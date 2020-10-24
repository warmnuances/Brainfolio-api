import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CustomTitle extends Document {
  
  @Prop({required: true })
  username: string;

  @Prop({ required: true })
  type: string;

  @Prop({ })
  sectionTitle : string;
}
export const CustomTitleSchema = SchemaFactory.createForClass(CustomTitle);