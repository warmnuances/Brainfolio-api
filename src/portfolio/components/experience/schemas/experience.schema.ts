import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Experience extends Document {
  @Prop()
  username: string;
 
  @Prop()
  type: string;

  @Prop()
  title: string;

  @Prop()
  companyName: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  description: string;

  @Prop()
  onGoing: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);