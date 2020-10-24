import { Document } from 'mongoose';

export interface Custom extends Document{
  username: string;
  type: string;
  itemTitle : string;
  itemSubTitle: string;
  description: string;
}

