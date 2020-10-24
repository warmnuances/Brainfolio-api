import { Document } from 'mongoose';

export interface Project extends Document{
    username: string;
    title: string;
    startDate: string;
    endDate: string;
    isPublic: boolean;
    description: string;
    projectFileName: string[];

    contributor: string[][];
    // filesToDelete: string[];
}