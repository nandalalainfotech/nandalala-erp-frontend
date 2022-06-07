import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-card',
  templateUrl: './process-card.component.html',
  styleUrls: ['./process-card.component.css']
})
export class ProcessCardComponent implements OnInit {

  @Input() Visit = 'Visit';
  @Input() percent = 98;
  @Input() Downloads = 'Downloads';
  @Input() dollarpercent = 66;
  @Input() Movies = 'Movies';
  @Input() amountperpercent = 75;
  @Input() Applications = 'Applications'
  @Input() pricepercent = 90;
  @Input() isSortable = false;
  @Input() class = '';

  constructor() { }

  ngOnInit(): void {
  }

}
