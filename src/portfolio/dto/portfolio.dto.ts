import { IsNotEmpty } from "class-validator";
import {Education} from '../components/education/interfaces/education.interface';
import {Experience} from '../components/experience/interfaces/experience.interface';
import {Profile} from '../components/profile/interfaces/profile.interface';
import {Skills} from '../components/skills/interfaces/skills.interface';

export class PortfolioDto {
    @IsNotEmpty()
    readonly userId: string;
    readonly education: Education[];
    readonly experience: Experience[];
    readonly profile: Profile[];
    readonly skills: Skills[];
}  