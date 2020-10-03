  
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
    id: String;

    @Prop()
    title: String;

    @Prop()
    startDate: String;

    @Prop()
    endDate: String;

    @Prop()
    visibility : String;

    @Prop()
    description : String;

    @Prop()
    projectFileName: [String];

    @Prop()
    contributor: [[String]];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);