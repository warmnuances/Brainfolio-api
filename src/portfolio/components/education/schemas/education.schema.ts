import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Education extends Document {
  
  @Prop({required: true })
  username: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate : Date;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false })
  score: string;

  @Prop({required: false})
  onGoing: boolean;
}

export const EducationSchema = SchemaFactory.createForClass(Education);