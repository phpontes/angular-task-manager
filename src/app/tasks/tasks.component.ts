import { Component, Input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;
  tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Get a job in IT',
      summary:
        'Get a job in IT as a backend developer, so you can pay your debts and won\'t have to work as a "peão de fábrica" never again.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Finish Angular course',
      summary:
        'Finish this Angular course before your will to live expires. Bonus points if you actually understand RxJS.',
      dueDate: '2025-12-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Deploy something (anything)',
      summary:
        "Deploy a project to impress recruiters — even if it's just a ToDo app that barely works, hosted on a free tier cloud provider held together by duct tape.",
      dueDate: '2025-12-31',
    },
  ];

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    })
    this.isAddingTask = false;
  }
}
