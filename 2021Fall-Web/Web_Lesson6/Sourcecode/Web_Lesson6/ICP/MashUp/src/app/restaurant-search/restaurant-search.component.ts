import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Component({
  selector: "app-restaurant-search",
  templateUrl: "./restaurant-search.component.html",
  styleUrls: ["./restaurant-search.component.css"],
})
export class RestaurantSearchComponent implements OnInit {
  public selectedRestaurant;
  modalRef: BsModalRef;
  public restaurantsList = [];
  public address: any;
  public currentLocation: any;
  constructor(private modalService: BsModalService, private http: HttpClient) {}

  ngOnInit() {
    this.getPosition().then((res) => {
      this.currentLocation = res;
      this.getNearByRestaurants();
    });
  }

  getNearByRestaurants() {
    this.restaurantsList = [];

    // using four square API to fetch the data of nearby restaurants
    this.http
      .get(
        `https://api.foursquare.com/v2/venues/search?ll=${this.currentLocation.lat},${this.currentLocation.lng}&categoryId=4d4b7105d754a06374d81259&client_id=${environment.FOURSQUARE_CLIENT_ID}&client_secret=${environment.FOURSQUARE_CLIENT_SECRET}&v=20210224`
      )
      .subscribe((response) => {
        const venues = response["response"]["venues"].slice(0, 4);
        console.log(venues);
        venues.map((venue) => {
          const obj = {
            name: venue.name,
            id: venue.id,
            address: venue["location"]["formattedAddress"],
          };
          console.log(obj);
          this.restaurantsList.push(obj);
        });
      });
  }

  // http call is happening here on click of get retaurants method
  getRestaurants() {
    this.restaurantsList = [];
    this.http
      .get(
        `https://api.foursquare.com/v2/venues/search?near=${this.address}&categoryId=4d4b7105d754a06374d81259&client_id=${environment.FOURSQUARE_CLIENT_ID}&client_secret=${environment.FOURSQUARE_CLIENT_SECRET}&v=20210224`
      )
      .subscribe((response) => {
        const venues = response["response"]["venues"].slice(0, 4);
        console.log(venues);
        venues.map((venue) => {
          const obj = {
            name: venue.name,
            id: venue.id,
            address: venue["location"]["formattedAddress"],
          };
          console.log(obj);
          this.restaurantsList.push(obj);
        });
      });
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
