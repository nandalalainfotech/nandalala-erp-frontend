import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Brand001mb } from "../entities/Brand001mb";

@Injectable()
export class BrandManager extends BaseService {

    private brandUrl: string = `${environment.apiUrl}/brand`;
    
    allbrand() {
        return this.getCallService(`${this.brandUrl}`+"/findAll");
    }

    savebrand(brand001mb: Brand001mb) {
        return this.postCallService(`${this.brandUrl}`+"/save", {}, brand001mb);
    }

    updatebrand(brand001mb: Brand001mb) {
        return this.putCallService(`${this.brandUrl}`+"/update", {}, brand001mb);
    }

    deletebrand(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.brandUrl}`+"/delete", data);
    }

    brandPdf() {
        return this.getCallService1(`${this.brandUrl}` + "/pdf");
    }

    brandExcel() {
        return this.getCallService1(`${this.brandUrl}` + "/excel");
    }

}