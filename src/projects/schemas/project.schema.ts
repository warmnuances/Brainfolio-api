  
// import * as mongoose from 'mongoose';

// export const ProjectSchema = new mongoose.Schema({
//     id: String,
//     title: String,
//     description: String,
//     projectFile: String,
//     contributor: String,
//     like: Number,
//     comment: String,
//     share: String,
// });


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {

    @Prop()
    username: String;

    @Prop()
    title: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    onGoing: boolean;

    @Prop()
    isPublic : boolean;

    @Prop()
    description : string;

    @Prop()
    projectFileName: string[];

    @Prop()
    youtubeLink: string;
    
    // @Prop()
    // contributor: string[][];
    @Prop()
    contributor:{
        name: string,
        email: string,
    }[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);