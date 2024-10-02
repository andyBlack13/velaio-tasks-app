import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/interfaces/ITask.interface';
import { TaskStatus } from 'src/app/interfaces/ITask.interface';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
/*import { MatGridListModule } from '@angular/material/grid-list';*/
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        //MatGridListModule
    ],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
    public rowHeight: string = '100px';
    public cols: number = 1;
    public tasks : ITask[] = [];
    public taskStatus = TaskStatus;
    public filteredTasks: ITask[] = [];
    public filterValue: string = 'all';
    public isDesktop: boolean = false;

    constructor(
        private taskService: TaskService,
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {
        //this.getAllTask();

        this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
        .subscribe(result => {
            this.isDesktop = result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge];
        });

        console.log(this.isDesktop)
        
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state as { taskWithNew?: any, allTasks?: any };

        if (state?.taskWithNew) {
            this.tasks = state.allTasks || [];
            console.log('Nueva tarea agregada:', state.taskWithNew);
        } else {
            // logica normal en dado caso que no se pasen nuevas tareas
            this.loadTasks();
        }
        
    }

    /*ngOnInit(): void {
        // alternativa a media querys para utilizar componentes de angular material
        this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).subscribe(result => {
            if (result.matches) {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    this.isDesktop = false;
                } else if (result.breakpoints[Breakpoints.Small]) {
                    this.isDesktop = false;
                } else if (result.breakpoints[Breakpoints.Medium]) {
                    this.isDesktop = false;
                } else if (result.breakpoints[Breakpoints.Large]) {
                    this.isDesktop = true;
                } else if (result.breakpoints[Breakpoints.XLarge]) {
                    this.isDesktop = true;
                }
            }
        });
    }*/

    loadTasks() {
        this.getAllTask();
        this.applyFilter(this.filterValue);
    }

    getAllTask(){
        this.tasks = this.taskService.getAllTask();
    }

    applyFilter(event: any) {
        //console.log('entro 1', event)
        this.filterValue = event;
        switch (this.filterValue) {
            case 'completed':
                //console.log('entro 3')
                this.filteredTasks = this.tasks.filter(task => task.status === TaskStatus.COMPLETED);
                break;
            case 'pending':
                this.filteredTasks = this.tasks.filter(task => task.status === TaskStatus.PENDING);
                break;
            case 'all':
                //console.log('entro 2')
                this.filteredTasks = this.tasks;
                break;
            default:
                this.filteredTasks = this.tasks;
                break;
        }
    }

    toggleTaskCompletion(index: any, status: string){
        console.log(index, status);

        const task = this.tasks[index];
    
        const statusSend = task.status === this.taskStatus.PENDING 
            ? this.taskStatus.COMPLETED 
            : this.taskStatus.PENDING;

        //const statusSend = status === this.taskStatus.PENDING ? this.taskStatus.COMPLETED : this.taskStatus.PENDING;
        this.taskService.changeStatusTask(index, statusSend);

    }

    redirect(route: string){
        this.router.navigate([route]);
    }
}
