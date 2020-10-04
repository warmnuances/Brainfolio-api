import { Document } from 'mongoose';

export interface Project extends Document{
    id?: string;
    title: string;
    description: string;
    projectFile: string;
    contributor: string;
}