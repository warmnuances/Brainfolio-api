import { Education } from '../../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../../projects/interfaces/project.interface';




export interface Portfolio{

    education: Education[];
    experience: Experience[];
    profile: Profile;
    skills: Skills[];
    project: Project[];
}
