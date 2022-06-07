import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Favourites001mb } from "../entities/favourites001mb";

@Injectable()
export class FavouritesManager extends BaseService {

    private favouritesUrl: string = `${environment.apiUrl}/favourite`;

    allfav() {
        return this.getCallService(`${this.favouritesUrl}` + "/findAll");
    }

    savefav(favourites001mbs: Favourites001mb[] = []) {
        // console.log("favourites001mb....>>>>>>>>>>>>", favourites001mbs);
        return this.postCallService(`${this.favouritesUrl}` + "/save", {}, favourites001mbs);
    }
}