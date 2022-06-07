import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
@Component({
    selector: 'app-salse-partner',
    templateUrl: './salse-partner.component.html',
    styleUrls: ['./salse-partner.component.css']
})
export class SalsePartnerComponent implements OnInit {
    public gridOptions: GridOptions | any;
    constructor() { }

    ngOnInit(): void {

    }

}
