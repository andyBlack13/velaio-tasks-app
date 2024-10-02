import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private form: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.form.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      limit_date: ['', Validators.required],
      persons: this.form.array([])
    });
  }

  ngOnInit(): void {
    this.addPerson();
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson(): void {
    const personGroup = this.form.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      // fix --> this.uniqueFullname.bind(this)
      age: ['', [Validators.required, Validators.min(19)]],
      skills: this.form.array([this.createSkill()])
    });
    this.persons.push(personGroup);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  createSkill(): FormGroup {
    return this.form.group({
      name: ['', Validators.required]
    });
  }

  addSkill(personIndex: number): void {
    const skills = this.persons.at(personIndex).get('skills') as FormArray;
    skills.push(this.createSkill());
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.persons.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  // fix --> no funcion
  uniqueFullname(control: any): { [key: string]: boolean } | null {
    const existingFullnames = this.persons.controls.map((p: any) => p.get('fullname').value);
    const isDuplicate = existingFullnames.includes(control.value);
    return isDuplicate ? { 'duplicate': true } : null;
  }

  getSkillControls(personIndex: number) {
    return (this.persons.at(personIndex).get('skills') as FormArray).controls;
  }  

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const response = this.taskService.createTask(taskData.name, taskData.limit_date, taskData.persons);

      if(response.statusBoolean){
        console.log(response);
        this.taskForm.reset();
        this.addPerson();
        this.router.navigate(['/tasks']);
      } else {
        console.error('Error al crear la tarea');
      }
      
    } else {
      console.log('Formulario no válido', this.taskForm.errors);
    }
  }
}
