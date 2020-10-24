import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Custom extends Document {
  
  @Prop({required: true })
  username: string;

  @Prop({ required: true })
  type: string;

  @Prop({ })
  itemTitle : string;

  @Prop({ })
  itemSubTitle: string;

  @Prop({  })
  description: string;
}

export const CustomSchema = SchemaFactory.createForClass(Custom);