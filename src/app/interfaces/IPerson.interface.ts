import { ISkill } from "./ISkill.interface";

export interface IPerson {
    id?: number;
    fullname?: string;
    age?: number;
    skills?: ISkill[];
  }
  