import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  fullname: string;

  @Prop({unique: true})
  email: string;

  @Prop({unique: true})
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  visibility: string;

  @Prop()
  visibilitylist: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);