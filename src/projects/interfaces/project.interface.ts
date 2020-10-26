import { Document } from 'mongoose';

export interface Project extends Document{
    username: string;
    title: string;
    startDate: Date;
    endDate: Date;
    onGoing: boolean;
    isPublic: boolean;
    description: string;
    projectFileName: string[];
    contributor: string[][];
    youtubeLink: string;
    // filesToDelete: string[];
}