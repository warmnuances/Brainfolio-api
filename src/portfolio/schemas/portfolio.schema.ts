import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {EducationSchema, Education} from '../components/education/schemas/education.schema'
import {ProfileSchema, Profile} from '../components/profile/schemas/profile.schema'
import {ExperienceSchema, Experience} from '../components/experience/schemas/experience.schema'
import {SkillsSchema, Skills} from '../components/skills/schemas/skills.schema'

@Schema()
export class Portfolio extends Document {
    @Prop()
    userId: string;

    @Prop({type: EducationSchema })
    education: [Education];

    @Prop({type: ProfileSchema })
    profile:[Profile];

    @Prop({type: ExperienceSchema })
    experience: [Experience];

    @Prop({type: SkillsSchema })
    skills: [Skills];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);