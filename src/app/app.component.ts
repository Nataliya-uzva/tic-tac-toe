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
  public stopClick = true;
  public start = 0;
  public turn = false;
  public dimension = 5;
  public line = 4;
  public steps = {'x': [], 'o': []};
  public winCombination = [];
  public winner = false;
  public player = '';
  public noWinner = false;

  constructor() {
    this.generateList(this.dimension);
   }

  generateList(count){
    let temp = 0;
    for(let i = 0; i < count; i++){
        this.arr[i] = [];
      for (let j = 0; j < count; j++) {
        this.arr[i][j] = this.createItem(temp);
        temp++;
      }
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

    if (this.start >= ((this.line * 2) - 1)) {
        if (!this.winCombination.length) {
          this.generateWinCombinations();
        }
        if (this.checkVin(cell.param)) {
          this.winner = !this.winner;
          this.stopClick = !this.stopClick;
          this.player = (cell.param).toUpperCase();
        }
    }
    if (this.start === (this.dimension * this.dimension)) {
      this.noWinner = true;
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
      for (let i = this.line - 1; i < this.dimension; i++) {
        this.winCombination.push(this.getRange3(i + j));
      }
    }
  }

  checkVin(param) {
    let check = false;
     for (let i = 0; i < this.winCombination.length; i++) {

        if (this.winCombination[i].every((number) => {
            return this.steps[param].indexOf(number) !== -1;
          })) {
          check = true;
          break;
        }
     }
     return check;
  }
  restartGame () {
    this.line = (this.dimension >= this.line) ? this.line : this.dimension;
    this.arr.length = 0;
    this.winCombination.length = 0;
    this.steps.x.length = 0;
    this.steps.o.length = 0;
    this.start = 0;
    this.stopClick = true;
    this.turn = false;
    this.winner = false;
    this.player = '';
    this.noWinner = false;
    this.generateList(this.dimension);
  }
}
