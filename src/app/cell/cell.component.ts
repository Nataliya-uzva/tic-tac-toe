import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css']
})
export class CellComponent implements OnInit {

  @Input()
  public cell: any;
  @Input()
  public stopClick: boolean;

  @Output()
  check: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log(this);
  }

  changeState() {
   if (this.cell.temp) {
     this.cell.temp = !this.cell.temp;
     this.check.emit({cell: this.cell});
   }
  }
  ngOnInit() {
  }

}
