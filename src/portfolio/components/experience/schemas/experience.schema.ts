import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Experience extends Document {
  @Prop()
  username: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: false })
  description: string;

  @Prop({required: false})
  onGoing: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);