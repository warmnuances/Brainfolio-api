import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum experienceType {
  Work, Volunteer
}

@Schema()
export class Experience extends Document {
  @Prop({ required: true })
  Type: experienceType;

  @Prop({ required: true })
  Title: string;

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: false })
  description: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);