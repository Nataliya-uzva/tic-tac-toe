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
  public stopClick = false;
  public start = 0;
  public turn = false;

  constructor() {
    this.generateList(9);
   }

  generateList(count){
    for(let i = 0; i < count; i++){
        this.arr.push(this.createItem());
      }
  }

  createItem(){
    return {param: '', temp: true};
  }

  changeState(cell){
    if (!cell.param && !this.start) {
      cell.param = 'x';
      //this.start += 1;
       } else {
      cell.param = (this.turn) ? 'o': 'x';
      }
    this.turn = !this.turn;
    this.start += 1;
    if (this.start >= 5) {
      this.checkVin(cell.param);
    }
  }

  checkVin(param) {
    let win = false;
    let count1 = [], count2 = [], count3 = [], count4 = [];
   for (let i = 0; i < this.arr.length; i++) {
     if (this.arr[i].param === param) {
       // if (!i && i <= 3) {
       //   count1.push(i);
       //   count2.push(i);
       // }
     }
   }
    return win;
  }
}
