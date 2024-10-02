import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask, TaskStatus } from '../interfaces/ITask.interface';
import { IPerson } from '../interfaces/IPerson.interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    //manejo de datos
    private tasks: ITask[] = [
        {
            id: 1,
            name: 'Documentación para API Velaio',
            limit_date: '2024-10-13',
            persons: [
                { fullname: 'Carlos Pérez', age: 30, skills: [{name: 'JavaScript'}, {name: 'Angular'}] },
                { fullname: 'Ana Gómez', age: 25, skills: [{name: 'HTML'}, {name: 'CSS'}, {name: 'TypeScript'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 2,
            name: 'Revisión del sistema de autenticación',
            limit_date: '2024-10-15',
            persons: [
                { fullname: 'Juan López', age: 40, skills: [{name: 'Node.js'}, {name: 'Express'}] },
                { fullname: 'María Rodríguez', age: 28, skills: [{name: 'PHP'}, {name: 'Laravel'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 3,
            name: 'Creación del sistema de notificaciones',
            limit_date: '2024-10-20',
            persons: [
                { fullname: 'Pedro Gutiérrez', age: 32, skills: [{name: 'Java'}, {name: 'Spring Boot'}] },
                { fullname: 'Lucía Sánchez', age: 29, skills: [{name: 'React'}, {name: 'Redux'}] }
            ],
            status: TaskStatus.COMPLETED
        },
        {
            id: 4,
            name: 'Optimización de la base de datos',
            limit_date: '2024-10-18',
            persons: [
                { fullname: 'Andrés Ramírez', age: 27, skills: [{name: 'PostgreSQL'}, {name: 'SQL'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 5,
            name: 'Desarrollo del módulo de pagos',
            limit_date: '2024-10-25',
            persons: [
                { fullname: 'Laura Fernández', age: 34, skills: [{name: 'Python'}, {name: 'Django'}] },
                { fullname: 'Fernando Castillo', age: 36, skills: [{name: 'Ruby'}, {name: 'Ruby on Rails'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 6,
            name: 'Implementación de seguridad en la API',
            limit_date: '2024-10-30',
            persons: [
                { fullname: 'Cecilia Moreno', age: 31, skills: [{name: 'OAuth'}, {name: 'JWT'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 7,
            name: 'Migración de servicios a la nube',
            limit_date: '2024-11-02',
            persons: [
                { fullname: 'José Martínez', age: 38, skills: [{name: 'AWS'}, {name: 'Docker'}] },
                { fullname: 'Luis Hernández', age: 29, skills: [{name: 'Kubernetes'}, {name: 'GCP'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 8,
            name: 'Testeo automatizado del sistema de usuarios',
            limit_date: '2024-11-05',
            persons: [
                { fullname: 'Claudia Medina', age: 26, skills: [{name: 'Selenium'}, {name: 'Jest'}] },
                { fullname: 'Ricardo Pérez', age: 33, skills: [{name: 'Cypress'}, {name: 'Mocha'}] }
            ],
            status: TaskStatus.COMPLETED
        },
        {
            id: 9,
            name: 'Actualización de la aplicación móvil',
            limit_date: '2024-11-08',
            persons: [
                { fullname: 'Elena Rivera', age: 24, skills: [{name: 'Swift'}, {name: 'iOS'}] },
                { fullname: 'Roberto Salinas', age: 28, skills: [{name: 'Kotlin'}, {name: 'Android'}] }
            ],
            status: TaskStatus.PENDING
        },
        {
            id: 10,
            name: 'Mejora del sistema de backups',
            limit_date: '2024-11-12',
            persons: [
                { fullname: 'Mónica Suárez', age: 35, skills: [{name: 'Bash'}, {name: 'Linux'}] }
            ],
            status: TaskStatus.PENDING
        }
    ];    

    getAllTask(){
        return this.tasks;
    }

    createTask(name: string, limit_date: string, persons: IPerson[] = []){
        const lastElement = this.tasks.at(-1);
        console.log(lastElement, 'ultimo registro');

        const task = {
            id: lastElement ? lastElement.id + 1 : 1,
            name: name,
            limit_date: limit_date,
            persons: persons,
            status: TaskStatus.PENDING
        }
        
        this.tasks.push(task);

        const response = {
            statusBoolean: true,
            status: 'Tarea creada correctamente',
            task: task,
            allTasks: this.tasks
        }

        return response;
    }

    changeStatusTask(index: number, status: TaskStatus): void {
        this.tasks[index].status = status;
        console.log(this.tasks[index],'task actulizada', this.tasks);
    }
}
