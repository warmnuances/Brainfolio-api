import { Document } from 'mongoose';

export interface Project extends Document{
    id?: string;
    title: string;
    startDate: string;
    endDate: string;
    visibility: string;
    description: string;
    projectFileName: [string];
    contributor: [[string]];
}