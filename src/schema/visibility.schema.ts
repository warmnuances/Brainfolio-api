import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Visibility extends Document {

    @Prop({ required: true })
    username: String;

    @Prop()
    type: string;

    @Prop()
    name : string;

    @Prop()
    email: string;

    @Prop()
    token: string;
}

export const VisibilitySchema = SchemaFactory.createForClass(Visibility);