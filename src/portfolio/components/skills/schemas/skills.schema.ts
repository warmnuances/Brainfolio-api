import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {

    @Prop()
    username: String;
    
    @Prop()
    category: String;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    rating : string;

}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
