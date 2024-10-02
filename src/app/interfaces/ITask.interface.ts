import { IPerson } from "./IPerson.interface";
import { ISkill } from "./ISkill.interface";

export enum TaskStatus {
  COMPLETED = 'Completado',
  PENDING = 'Pendiente'
}

export interface ITask {
    id: number;
    name?: string;
    limit_date?: string;
    persons?: IPerson[];
    status?:TaskStatus ;
  }
  