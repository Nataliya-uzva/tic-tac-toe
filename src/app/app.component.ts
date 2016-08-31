import { Component } from '@angular/core';
import { CellComponent } from './cell';
import {every} from "rxjs/operator/every";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CellComponent]
})
export class AppComponent {
  public arr = [];
  public stopClick = true;
  public start = 0;
  public turn = false;
  public dimension = 3;
  public line = 3;
  public steps = {'x': [], 'o': []};
  public winCombination = [];

  constructor() {
    this.generateList(this.dimension);
   }

  generateList(count){
    for(let i = 0; i < (count * count); i++){
        this.arr.push(this.createItem(i));
      }
  }

  createItem(num){
    return {param: '', temp: true, index: num};
  }

  changeState(cell){
    if (!cell.param && !this.start) {
      cell.param = 'x';
    } else {
      cell.param = (this.turn) ? 'o': 'x';
    }
    this.turn = !this.turn;
    this.start += 1;
    this.steps[cell.param].push(cell.index);
    console.log(this.steps);

    if (this.start >= ((this.line * 2) - 1)) {
        if (!this.winCombination.length) {
          this.generateWinCombinations();
          console.log(this.winCombination);
        }
       this.checkVin(cell.param);
    }
  }
// horizontal
  getRange(start) {
   let res = [];
    while (res.length !== this.line) {
     res.push(start);
     start++;
   }
    return res;
  }
  // vertical
  getRange1(start) {
    let res = [];
    while (res.length !== this.line) {
      res.push(start);
      start += this.dimension;
    }
    return res;
  }

  // right diagonal

  getRange2(start) {
    let res = [];
    while (res.length !== this.line) {
      res.push(start);
     start += (this.dimension + 1);
    }
   return res;
  }
  // left diagonal
  getRange3(start) {
   let res = [];
    while (res.length !== this.line) {
     res.push(start);
     start += (this.dimension - 1);
    }
    return res;
   }

  generateWinCombinations () {
  // horizontal
    for (let j = 0; j < (this.dimension * this.dimension); j += this.dimension) {
      for (let i = 0; i <= (this.dimension - this.line); i++) {
        this.winCombination.push(this.getRange(i + j));
      }
    }
  // vertical
    for (let j = 0; j < this.dimension * (this.dimension - this.line + 1); j++) {
      this.winCombination.push(this.getRange1(j));
    }
  // right diagonal
    for (let j = 0; j < this.dimension * (this.dimension - this.line + 1); j += this.dimension) {
      for (let i = 0; i <= (this.dimension - this.line); i++) {
        this.winCombination.push(this.getRange2( i+j ));
      }
    }
  // left diagonal
    for (let j = 0; j < (this.dimension * (this.dimension - this.line + 1)); j += this.dimension) {
      for (let i = this.dimension - 1; i < this.dimension; i++) {
        this.winCombination.push(this.getRange3(i + j));
      }
    }
  }

  checkVin(param) {
   for (let i = 0; i < this.winCombination.length; i++) {

    if (this.winCombination[i].every((number) => {
        return this.steps[param].indexOf(number) !== -1;
      })) {
      this.stopClick = !this.stopClick;
      console.log(param + ' win!');
    }

  }

  }
}
