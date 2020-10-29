import { Document } from 'mongoose';

export interface Visibility extends Document{
    username: string;
    name: string;
    email: string;
    token: string;
    type: string;

}