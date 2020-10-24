import { Document } from 'mongoose';

export interface Custom extends Document{
  username: string;
  type: string;
  itemTitle : Date;
  itemSubTitle: string;
  description: string;
}

