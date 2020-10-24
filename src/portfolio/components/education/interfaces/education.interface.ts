import { Document } from 'mongoose';

export interface Education extends Document{
    username: string;
    startDate: Date;
    endDate: Date;
    degree: string;
    institution: string;
    location: string;
    score: string;
    onGoing: boolean;
}


// @Prop()
// portfolioId: String;

// @Prop({ required: true })
// startDate: string;

// @Prop({ required: true })
// endDate : string;

// @Prop({ required: true })
// degree: string;

// @Prop({ required: true })
// institution: string;

// @Prop({ required: false })
// location: string;

// @Prop({ required: false })
// score: string;