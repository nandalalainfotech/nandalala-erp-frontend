import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Crmspcust001mb } from "../entities/Crmspcust001mb";

@Injectable()

export class CrmSalesCustomerManager extends BaseService {

  private crmSalesCustomerUrl: string = `${environment.apiUrl}/customersale`;

  allcustomersale() {
    return this.getCallService(`${this.crmSalesCustomerUrl}` + "/findAll");
  }

  savecustomersale(crmspcust001mb: Crmspcust001mb) {
    return this.postCallService(`${this.crmSalesCustomerUrl}` + "/save", {}, crmspcust001mb);
  }

  updatecustomersale(crmspcust001mb: Crmspcust001mb) {
    return this.putCallService(`${this.crmSalesCustomerUrl}` + "/update", {}, crmspcust001mb);
  }

  deletecustomersale(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.crmSalesCustomerUrl}` + "/delete", data);
  }

  crmSalesCustomerPdf() {
    return this.getCallService1(`${this.crmSalesCustomerUrl}` + "/pdf");
  }

  crmSalesCustomerExcel() {
    return this.getCallService1(`${this.crmSalesCustomerUrl}` + "/excel");
  }
}