import {Component, NgModule, Input, Output, EventEmitter} from '@angular/core';

export class Task {
	public task: string;

	constructor(task: string) {
		this.task = task;
	}
}


@Component({
	selector: 'task-form',
	template: `
<div class="card card-block">
  <h2 class="card-title">Add A Task</h2>
  <div class="input-group">
      
    <input type="text"
            id="txtAddTask"
           class="form-control"
           #task>
    <span class="input-group-btn">
  <button type="button"
          class="btn btn-primary"
          (click)="createTask(task.value)"><span class="glyphicon glyphicon-ok"></span>
  </button></span></div>
</div>
  `
})
export class TaskFormComponent {
	@Output() taskCreated = new EventEmitter<Task>();

	createTask(task: string) {
		this.taskCreated.emit(new Task(task));
        document.getElementById("txtAddTask").value = "";
	}
}


@Component({
	selector: 'task',
	template: `
  <div class="row">
    <div class="col-xs-10"><p>{{data.task}}</p></div>
  <div class="col-xs-2"><button (click)="deleteClicked()" aria-label="Delete"><span aria-hidden="true">&times;</span></button></div>
  </div>
  `
})
export class TaskComponent {
	@Input('task') data: Task;
    @Output() deleteTask = new EventEmitter<Task>();
task: Task[]
      deleteClicked() {
        this.deleteTask.next(this.task);
      }
}

@Component({
	selector: 'task-list',
	template: `<div class="row">
      <div class="col-sm-12">
    <h1>Your Todo List</h1>
    <div class="task-container">
<task *ngFor="let t of tasks; let i = index;" [task]="t" (deleteTask)="deleteTask(i)"></task>
</div>
<hr>
<task-form (taskCreated)="addTask($event)"></task-form>
</div>
</div>
  `
})
export class TaskListComponent {
	tasks: Task[];

	constructor() {
		this.tasks = [];
	}

	addTask(task) {
		this.tasks.unshift(task);
	}
    deleteTask(taskIndex) {
		this.tasks.splice(taskIndex, 1);
	}
}


@Component({
	selector: 'app',
	template: `
<task-list></task-list>
  `
})
export class AppComponent {
}

