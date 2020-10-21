import { Document } from 'mongoose';

export interface Project extends Document{
    username: string;
    title: string;
    startDate: string;
    endDate: string;
    visibility: string;
    description: string;
    projectFileName: string[];

    contributor: string[][];
    // filesToDelete: string[];
}