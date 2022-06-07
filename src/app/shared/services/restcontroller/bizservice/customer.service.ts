import { Injectable } from "@angular/core";
import { Customerdetails001mb } from "src/app/shared/services/restcontroller/entities/Customerdetails001mb";
import { BaseService } from "src/app/shared/services/services/base.service";
import { environment } from "src/environments/environment";

@Injectable()
export class CustomerManager extends BaseService {

    private customerUrl: string = `${environment.apiUrl}/customer`;

    allcustomer() {
        return this.getCallService(`${this.customerUrl}`+"/findAll");
    }
    customersave(customerdetails001mb: Customerdetails001mb) {
        return this.postCallService(`${this.customerUrl}`+"/save", {}, customerdetails001mb);
    }
    customerupdate(customerdetails001mb: Customerdetails001mb) {
        return this.putCallService(`${this.customerUrl}`+"/update", {}, customerdetails001mb);
    }
    customerdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.customerUrl}`+"/delete", data);
    }

    customerPdf() {
        return this.getCallService1(`${this.customerUrl}` + "/pdf");
      }
    
      customerExcel() {
        return this.getCallService1(`${this.customerUrl}` + "/excel");
      }

}