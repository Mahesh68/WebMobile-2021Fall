import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo/todo.component";
import { TimerComponent } from "./timer/timer.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, TodoComponent, TimerComponent, HomeComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
