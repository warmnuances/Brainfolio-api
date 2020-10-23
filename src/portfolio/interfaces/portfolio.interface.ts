import { Document } from 'mongoose';
import {Education} from '../components/education/interfaces/education.interface';
import {Experience} from '../components/experience/interfaces/experience.interface';
import {Profile} from '../components/profile/interfaces/profile.interface';
import {Skills} from '../components/skills/interfaces/skills.interface';

export interface Portfolio extends Document{
    userId: String;
    education: Education[];
    experience: Experience[];
    profile: Profile[];
    skills: Skills[];
}