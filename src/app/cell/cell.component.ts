import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css']
})
export class CellComponent implements OnInit {

  @Input()
  public val: string;

  constructor() {

  }

  changeState() {
    if(this.val === ''){
      this.val = 'X'

    }else if(this.val === 'X'){
      this.val = '0';

    }
  }
  ngOnInit() {
  }

}
