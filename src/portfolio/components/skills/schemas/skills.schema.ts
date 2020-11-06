import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {

    @Prop()
    username: string;
    
    @Prop()
    category: string;

    @Prop()
    name: string;

    @Prop()
    rating: number;

}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
