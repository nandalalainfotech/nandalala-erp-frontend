import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prodstockentry001mb } from "../entities/Prodstockentry001mb";

@Injectable()
export class ProdStockManager extends BaseService {

  private prodStockUrl: string = `${environment.apiUrl}/prodstock`
  
  allstock() {
    return this.getCallService(`${this.prodStockUrl}`+"/findall");
  }

  stocksave(prodstockentry001mb: Prodstockentry001mb) {
    return this.postCallService(`${this.prodStockUrl}`+"/save", {}, prodstockentry001mb);
  }
  stockupdate(prodstockentry001mb: Prodstockentry001mb) {
    return this.putCallService(`${this.prodStockUrl}`+"/update", {}, prodstockentry001mb);
  }
  stockdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.prodStockUrl}`+"/delete", data);
  }

  prodStockPdf() {
    return this.getCallService1(`${this.prodStockUrl}` + "/pdf");
}

prodStockExcel() {
    return this.getCallService1(`${this.prodStockUrl}` + "/excel");
}

}
