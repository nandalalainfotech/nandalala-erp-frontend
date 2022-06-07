import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Budgetaccounttype001mb } from "../entities/Budgetaccounttype001mb";

@Injectable()

export class BudgetAccountManager extends BaseService {

    private budgetAccountUrl: string = `${environment.apiUrl}/budgetaccount`;

    allbudacc() {
        return this.getCallService(`${this.budgetAccountUrl}` + "/findAll");
    }

    budaccsave(budgetaccounttype001mb: Budgetaccounttype001mb) {
        return this.postCallService(`${this.budgetAccountUrl}` + "/save", {}, budgetaccounttype001mb);
    }

    budaccupdate(budgetaccounttype001mb: Budgetaccounttype001mb) {
        return this.putCallService(`${this.budgetAccountUrl}` + "/update", {}, budgetaccounttype001mb);
    }

    budaccdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.budgetAccountUrl}` + "/delete", data);
    }

    budgetAccountPdf() {
        return this.getCallService1(`${this.budgetAccountUrl}` + "/pdf");
    }

    budgetAccountExcel() {
        return this.getCallService1(`${this.budgetAccountUrl}` + "/excel");
    }

}