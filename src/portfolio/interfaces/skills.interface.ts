import { Document } from 'mongoose';

export interface Skills extends Document{
    portfolioId: string;
    category: string;
    name: string;
    rating: string;
    priority: number;
}
// @Prop()
// portfolioId: String;

// @Prop()
// category: String;

// @Prop({ required: true })
// name: string;

// @Prop({ required: true })
// rating : string;

// @Prop({ required: true })
// priority: string;