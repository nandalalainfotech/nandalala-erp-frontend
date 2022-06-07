import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("account-dashbord called------>");
  }

}
