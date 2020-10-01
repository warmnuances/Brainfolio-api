import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Education extends Document {
  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate : string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false })
  score: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);