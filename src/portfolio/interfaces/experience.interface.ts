import { Document } from 'mongoose';

export enum experienceType {
    Work, Volunteer
}  

export interface Experience extends Document{
    portfolioId: string;
    type: experienceType;
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