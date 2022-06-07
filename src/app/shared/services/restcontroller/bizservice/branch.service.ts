import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';
import { Branch001mb } from '../entities/Branch001mb';



@Injectable()
export class BranchManager extends BaseService {

    private branchUrl: string = `${environment.apiUrl}/branch`;

    allbranch() {
        return this.getCallService(`${this.branchUrl}`+"/findAll");
    }
    savebranch(branch001mb: Branch001mb) {
        return this.postCallService(`${this.branchUrl}`+"/save", {}, branch001mb);
    }
    updatebranch(branch001mb: Branch001mb) {
        return this.putCallService(`${this.branchUrl}`+"/update", {}, branch001mb);
    }

    deletebranch(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.branchUrl}`+"/delete", data);
    }

    branchPdf() {
        return this.getCallService1(`${this.branchUrl}` + "/pdf");
    }

    branchExcel() {
        return this.getCallService1(`${this.branchUrl}` + "/excel");
    }

}
