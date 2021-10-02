import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [
    ".background {background:#000000; color: white}",
    "li a { color: white}",
    "ul.nav a:hover { color: #998f18  }",
  ],
})
export class HeaderComponent {
  constructor() {}
}
