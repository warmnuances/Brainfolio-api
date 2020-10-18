import { Document } from 'mongoose';

export interface Experience extends Document{
    username: string;
    type: string;
    title: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
}


// @Prop()
// portfolioId: String;

// @Prop({ required: true })
// Type: experienceType;

// @Prop({ required: true })
// Title: string;

// @Prop({ required: true })
// Name: string;

// @Prop({ required: true })
// startDate: string;

// @Prop({ required: true })
// endDate: string;

// @Prop({ required: false })
// description: string;