import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Expensesclm001mb } from "../entities/Expensesclm001mb";

@Injectable()
export class ExpensesclmManager extends BaseService {

    private expensesclmUrl: string = `${environment.apiUrl}/expenses`;
    
    allexpenses() {
        return this.getCallService(`${this.expensesclmUrl}`+"/findAll");
    }
    saveexpenses(expensesclm001mb: Expensesclm001mb) {
        return this.postCallService(`${this.expensesclmUrl}`+"/save", {}, expensesclm001mb);
    }
    updateexpenses(expensesclm001mb: Expensesclm001mb) {
        return this.putCallService(`${this.expensesclmUrl}`+"/update", {}, expensesclm001mb);
    }
    deleteexpenses(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.expensesclmUrl}`+"/delete", data);
    }

    expensesclmPdf() {
        return this.getCallService1(`${this.expensesclmUrl}` + "/pdf");
    }

    expensesclmExcel() {
        return this.getCallService1(`${this.expensesclmUrl}` + "/excel");
    }

}