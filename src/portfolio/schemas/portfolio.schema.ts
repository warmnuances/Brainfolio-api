import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Portfolio extends Document {

    @Prop()
    id: String;

    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    projectFile: String;

    @Prop()
    contributor: String;

    @Prop()
    like: Number;

    @Prop()
    comment: String;

    @Prop()
    share: String;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);