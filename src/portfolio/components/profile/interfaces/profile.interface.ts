import { Document } from 'mongoose';

export interface Profile extends Document{
    username: string;
    fullName: string;
    address: string;
    email: string;
    phone: string;
    relevantLink: string;
    linkedIn: string;
    title:string;
    profileImageName: [string];
    backgroundImageName: [string];
    filetodelete: string;
    isPublic: boolean;
    dark: boolean;

}

// @Prop()
//   portfolioId: String;
  
//   @Prop({ required: true })
//   fullName: string;

//   @Prop({ required: true })
//   address: string;

//   @Prop({ required: true })
//   email: string;

//   @Prop({ required: true })
//   phone: string;

//   @Prop({ required: false })
//   relevantLink: string;

//   @Prop({ required: false })
//   linkedIn: string;

//   @Prop({ required: false })
//   title: string;

//   //Profile Image insert
//   //Background Image insert