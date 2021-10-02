import { Component, ElementRef, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  wishes: Array<any>;
  inputItem: String;
  status: Boolean;

  // list of items are initialized initially in constructor
  constructor(private elRef: ElementRef) {
    this.wishes = [
      "learn how to use JQuery",
      "build a website",
      "Become a Web Developer",
    ];
  }

  // initialization of items can also be done here in ngOninit
  ngOnInit() {}

  // FOLLOWING LIFE CYCLE METHODS

  /* As the items are updating after app initialized, updataTotal 
  has to be called after view init to get the total no.of items
  */
  ngAfterViewInit() {
    this.updateTotal();
  }

  // When task pending is clicked, status of item is changed to completed
  changeStatus(event) {
    if (event.srcElement.className == "label pending") {
      event.srcElement.className = "label success";
      event.srcElement.innerHTML = "Done!";
      $(event.target).parent().attr("class", "completed");
    } else {
      event.srcElement.className = "label pending";
    }
    this.updateTotal();
  }

  // on click of submit button using Event binding
  onAddToList() {
    var item = $("#item").val();

    $("#item").val(""); /* clear value */
    $("#item").focus();
    console.log(this.inputItem);
    this.wishes.push(this.inputItem);
    this.updateTotal();
  }

  // To get count of items
  updateTotal() {
    let completed = $(".success").length;
    let pending = $(".pending").length;

    if (completed > 0 || pending > 0) {
      $(".total").text(" Pending: " + pending + " Completed: " + completed);
    }
  }
}
