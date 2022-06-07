import { Component, OnInit } from '@angular/core';

export interface IProfileStatus {
  title: string;
  total: number;
  status: number;
}
@Component({
  selector: 'app-status-of-site',
  templateUrl: './status-of-site.component.html',
  styleUrls: ['./status-of-site.component.css']
})
export class StatusOfSiteComponent implements OnInit {
 

 data: IProfileStatus[] = [
    {
        title: 'Basic Information',
        total: 30,
        status: 10
    },
    {
        title: 'Company Staff Details',
        total: 9,
        status: 5
    },
    {
        title: 'Products',
        total: 15,
        status: 12
    },
    {
        title: 'Public Interests',
        total: 100,
        status: 50
    },
    {
        title: 'Legal Documents',
        total: 10,
        status: 5
    }
];

 constructor() { }

  ngOnInit(): void {
  }
}
