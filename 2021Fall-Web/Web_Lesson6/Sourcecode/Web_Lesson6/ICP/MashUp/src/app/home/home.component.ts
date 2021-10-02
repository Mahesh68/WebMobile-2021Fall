import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // This method will be called on form submit. 'f' has reference to the form fields
  onSubmit(f: NgForm) {
    console.log(f.value);
    this.router.navigate(["search-recipe"]);
  }
}
