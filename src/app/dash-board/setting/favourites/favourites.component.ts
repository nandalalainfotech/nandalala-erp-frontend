import { Component, OnInit } from '@angular/core';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { FavouritesManager } from 'src/app/shared/services/restcontroller/bizservice/favourites.service';
import { Favourites001mb } from 'src/app/shared/services/restcontroller/entities/favourites001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
    favId: number | any;
    property: string = "";
    link: string = "";
    loginUser: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    favorites: any = [];
    favitems: any = [];
    favourites001mbs: Favourites001mb[] = [];
    constructor(private calloutService: CalloutService, private favouritesManager: FavouritesManager, private authManager: AuthManager,) { }

    ngOnInit(): void {

        this.favouritesManager.allfav().subscribe(response => {
            this.favourites001mbs = deserialize<Favourites001mb[]>(Favourites001mb, response);
            // console.log("this.favourites001mbs", this.favourites001mbs);
            // for(let i=0; i<response.length; i++){
            // let propertty=response[i].property;
            // console.log("response",propertty);
            // }
        });
    }

    onClick(event: any, property: string = "") {
        // console.log("event----->>>", event.target.checked, [property]);
        if (event.target.checked && this.favorites.length < 10) {
            let favorite: any = { property: property, link: event.target.value };
            this.favorites.push(favorite);
        } else if (!event.target.checked) {
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i].link == event.target.value) {
                    this.favorites.splice(i, 1);
                    // console.log("this.favorites[i].property......>", this.favorites[i].property);
                    // console.log("event.target.value......>", this.property);
                    break;

                }
            }
        } else {
            event.target.checked = false;
            this.calloutService.showWarning("please select maximum 10 components");
        }
    }

    onSubmitClick(event: any, property: string = "") {
        let favourites001mbs: Favourites001mb[] = [];
        for (let i = 0; i < this.favorites.length; i++) {
            let favourites001mb = new Favourites001mb();
            favourites001mb.property = this.favorites[i].property;
            favourites001mb.link = this.favorites[i].link;
            favourites001mb.status = "Y";
            favourites001mb.loginUser = this.authManager.getcurrentUser.username;
            favourites001mb.insertUser = this.authManager.getcurrentUser.username;
            favourites001mb.insertDatetime = new Date();

            favourites001mbs.push(favourites001mb);
        }
        // console.log("favourites001mbs", favourites001mbs);
        this.favouritesManager.savefav(favourites001mbs).subscribe((response) => {
            this.calloutService.showSuccess("Favourites Saved Successfully");
        })
    }
}


