import { Document } from 'mongoose';

export interface Portfolio extends Document{
    id?: string;
    title: string;
    description: string;
    projectFile: string;
    contributor: string;
    like: number;
    comment: string;
    share: string;
}