import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface todoTask{
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})

export class AddTodoComponent implements OnInit {
  constructor() { }

  @Output() newTodo: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  addTodo(){
    //method to get new task from user input and emit event that a new tod has been added
    let input = document.querySelector('textarea');
    if(input != null && input.value != ''){
      let data: todoTask = {
        task:input.value,
        completed: false
      };
      this.newTodo.emit({eventData:data});
      input.value = '';
    }
  }
}
