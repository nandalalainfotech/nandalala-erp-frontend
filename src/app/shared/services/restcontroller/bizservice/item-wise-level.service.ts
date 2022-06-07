import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemwiselevel001mb } from "../entities/Itemwiselevel001mb";

@Injectable()
export class ItemWiseLevelManager extends BaseService {

    private itemWiseLevelUrl: string = `${environment.apiUrl}/itemwise`;

    allitemwise() {
        return this.getCallService(`${this.itemWiseLevelUrl}` + "/findAll");
    }
    itemwisesave(itemwiselevel001mb: Itemwiselevel001mb) {
        return this.postCallService(`${this.itemWiseLevelUrl}` + "/save", {}, itemwiselevel001mb);
    }
    itemwiseupdate(itemwiselevel001mb: Itemwiselevel001mb) {
        return this.putCallService(`${this.itemWiseLevelUrl}` + "/update", {}, itemwiselevel001mb);
    }
    itemwisedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemWiseLevelUrl}` + "/delete", data);
    }

    itemWiseLevelPdf() {
        return this.getCallService1(`${this.itemWiseLevelUrl}` + "/pdf");
    }

    itemWiseLevelExcel() {
        return this.getCallService1(`${this.itemWiseLevelUrl}` + "/excel");
    }

}