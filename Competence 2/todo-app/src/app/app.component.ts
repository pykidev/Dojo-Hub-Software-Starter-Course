import { Component } from '@angular/core';
import {todoTask} from './add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo-app'; 
  done = '0%';
  todos: todoTask[] = this.getToDos();
  

  getToDos() : todoTask[] {
    //method to retrieve stored todo list
    if(window.localStorage.getItem('todos') != null){
      let todos: string = (window.localStorage.getItem('todos') as string) ;
      let newtodos = JSON.parse(todos);
      this.progress(newtodos);
      return newtodos;
    }
    return [];
  }

  progress(todos: todoTask[]): void{
    //method to update the progress bar based on the completed todos
    let tasksCompleted = 0;
    if(todos.length != 0){
      for (let todo of todos) {
        tasksCompleted += todo.completed == true ? 1: 0;
      }
      this.done = `${(tasksCompleted/todos.length)*100}%`;
    }else{
      this.done = '0%';
    }
  }

  onNewTodo(event: any): void{
    //method to add new todo
    this.todos.push(event.eventData);
    this.progress(this.todos);
    console.log(this.todos);
    this.saveToDos();
  }

  completeToDo(event: any): void{
    //method to update todo status to completed
    for (let todo of this.todos) {
      if(event.target.innerHTML == todo.task){
        todo.completed = true;
        this.progress(this.todos);
        break;
      }
    }
    this.saveToDos();
  }

  saveToDos(): void{
    //method to save todo list in localStorage
    let data = JSON.stringify(this.todos);
    window.localStorage.setItem('todos',data);
  }
}
