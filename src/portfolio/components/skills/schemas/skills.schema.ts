import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {

    @Prop()
    username: String;
    
    @Prop()
    category: String;

    @Prop({  })
    name: string;

    @Prop({ })
    rating : string;

}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
