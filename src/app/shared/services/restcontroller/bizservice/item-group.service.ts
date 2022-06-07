import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Itemgroup001mb } from "../entities/Itemgroup001mb";

@Injectable()
export class ItemGroupManager extends BaseService {

    private itemGroupUrl: string = `${environment.apiUrl}/itemgroup`

    allitemgroup() {
        return this.getCallService(`${this.itemGroupUrl}` + "/findAll");
    }
    saveitemgroup(itemgroup001mb: Itemgroup001mb) {
        return this.postCallService(`${this.itemGroupUrl}` + "/save", {}, itemgroup001mb);
    }
    updateitemgroup(itemgroup001mb: Itemgroup001mb) {
        return this.putCallService(`${this.itemGroupUrl}` + "/update", {}, itemgroup001mb);
    }
    deleteitemgroup(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.itemGroupUrl}` + "/delete", data);
    }

    itemGroupPdf() {
        return this.getCallService1(`${this.itemGroupUrl}` + "/pdf");
    }

    itemGroupExcel() {
        return this.getCallService1(`${this.itemGroupUrl}` + "/excel");
    }

}