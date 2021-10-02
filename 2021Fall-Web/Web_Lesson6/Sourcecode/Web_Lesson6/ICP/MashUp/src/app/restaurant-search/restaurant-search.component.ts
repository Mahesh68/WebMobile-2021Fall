import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {
  public selectedRestaurant;
  modalRef: BsModalRef;
  public restaurantsList = [];
  public address: any;
  public currentLocation: any;
  constructor(private modalService: BsModalService, private http: HttpClient) { }

  ngOnInit() {
    this.getPosition().then(res => {
      this.currentLocation = res;
      this.getNearByRestaurants();
    });
  }

  getNearByRestaurants() {
    this.restaurantsList = [];
    this.http.get(`https://api.foursquare.com/v2/venues/search?ll=${this.currentLocation.lat},${this.currentLocation.lng}&categoryId=4d4b7105d754a06374d81259&client_id=${environment.FOURSQUARE_CLIENT_ID}&client_secret=${environment.FOURSQUARE_CLIENT_SECRET}&v=20210224`).subscribe(response => {
      const venues = response['response']['venues'].slice(0, 4);
      console.log(venues)
      venues.map(venue => {
        const obj = {
          name: venue.name,
          id:venue.id,
          address: venue['location']['formattedAddress']
        }
        console.log(obj)
        this.restaurantsList.push(obj);
      })
    })
  }

  getRestaurants() {
    this.restaurantsList = [];
    this.http.get(`https://api.foursquare.com/v2/venues/search?near=${this.address}&categoryId=4d4b7105d754a06374d81259&client_id=${environment.FOURSQUARE_CLIENT_ID}&client_secret=${environment.FOURSQUARE_CLIENT_SECRET}&v=20210224`).subscribe(response => {
      const venues = response['response']['venues'].slice(0, 4);
      console.log(venues)
      venues.map(venue => {
        const obj = {
          name: venue.name,
          id:venue.id,
          address: venue['location']['formattedAddress']
        }
        console.log(obj)
        this.restaurantsList.push(obj);
      })

    })
  }

   getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  openDetails(restaurant, template: TemplateRef<any>) {
    this.http.get(`https://api.foursquare.com/v2/venues/${restaurant.id}&client_id=${environment.FOURSQUARE_CLIENT_ID}&client_secret=${environment.FOURSQUARE_CLIENT_SECRET}&v=20210224`).subscribe(data => {
      console.log(data)
    })
    this.selectedRestaurant = {
      "formatted_address": restaurant.address.join(","),
      "formatted_phone_number": "(02) 9696 2500",
      "name": restaurant.name,
      "reviews" : [
         {
            "author_name" : "Robert Ardill",
            "author_url" : "https://www.google.com/maps/contrib/106422854611155436041/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh3.googleusercontent.com/-T47KxWuAoJU/AAAAAAAAAAI/AAAAAAAAAZo/BDmyI12BZAs/s128-c0x00000000-cc-rp-mo-ba1/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "a month ago",
            "text" : "Awesome offices. Great facilities, location and views. Staff are great hosts",
            "time" : 1491144016
        },
        {
            "author_name": "Kalain Y",
            "author_url": "https://www.google.com/maps/contrib/103402089989904997713/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/-X_ybIBiuzjo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclGA4sAuZP7VLMjv4AidLK07GXpjQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating": 2,
            "relative_time_description": "a month ago",
            "text": "Why are Yous charging me a monthly fee if I have no subscriptions with yous, charging me $80 whenever Yous feel like it is not ok .",
            "time": 1611208302
        },
      ],
    }
    this.modalRef = this.modalService.show(template);
  }

}
