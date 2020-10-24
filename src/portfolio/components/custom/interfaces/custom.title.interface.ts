import { Document } from 'mongoose';

export interface CustomTitle extends Document{
    username: string;
  
    type: string;
  
    sectionTitle : string;
}

