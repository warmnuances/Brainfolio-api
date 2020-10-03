import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum experienceType {
  Work, Volunteer
}

@Schema()
export class Experience extends Document {
  @Prop()
  portfolioId: String;

  @Prop({ required: true })
  type: experienceType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: false })
  description: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);