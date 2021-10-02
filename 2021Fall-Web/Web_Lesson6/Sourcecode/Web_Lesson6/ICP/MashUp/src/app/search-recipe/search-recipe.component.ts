import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-search-recipe",
  templateUrl: "./search-recipe.component.html",
  styleUrls: ["./search-recipe.component.css"],
})
export class SearchRecipeComponent implements OnInit {
  // input field reference has been taken to view child decorator
  @ViewChild("recipe") recipes: ElementRef;
  @ViewChild("place") places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {}

  // lifecycle hook initiated on initialization of component
  ngOnInit() {
    // location of place are initialized
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.geolocationPosition = position;
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
    });
  }

  getVenues() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      /*
       * Write code to get recipe
       *
       * An account is created in edamam and a new application is creted for recipe search API
       * app_id and app_key from the created application are passed as a query parameters to the http call
       *
       * As ouput is a observable, subscription to it will give response.
       */
      this._http
        .get(
          "https://api.edamam.com/search?q=" +
            this.recipeValue +
            "&app_id=c1b99dbb" +
            "&app_key=05395b83ddb8bf62ebcee12433106c59"
        )
        .subscribe((data: any) => {
          this.recipeList = data.hits;
        });
    }

    if (
      this.placeValue != null &&
      this.placeValue !== "" &&
      this.recipeValue != null &&
      this.recipeValue !== ""
    ) {
      /**
       * Write code to get place
       *
       * Account is created in foursquare and client id and secret key are passed as a query parameters to the API call
       */
      this._http
        .get(
          "https://api.foursquare.com/v2/venues/search?query=" +
            this.recipeValue +
            "&near=" +
            this.placeValue +
            "&limit=5" +
            "&client_id=3CLKBEFPCHEGSXL2VTLI2JL50HPNKKDG1MYBE122TOOUBYM5" +
            "&client_secret=LNTEE5ANHIFTXXRCMXD51FXZ4WD5TDOY3SV2P2F52LF44IEH" +
            "&v=20210930"
        )
        .subscribe((data: any) => {
          this.venueList = data.response.venues;
        });
    }
  }
}
