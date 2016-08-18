import { Component } from '@angular/core';
import { CellComponent } from './cell';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CellComponent]
})
export class AppComponent {
  public arr = [];

  constructor() {
    this.generateList(9);
  }

  generateList(count){
    for(let i = 0; i < count; i++){
      this.arr.push(this.createItem(i));
    }
  }

  createItem(index){
    return {param: ''};
  }


}
