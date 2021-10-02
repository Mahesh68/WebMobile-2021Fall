import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TimerComponent } from "./timer/timer.component";
import { TodoComponent } from "./todo/todo.component";

// Defining routes for the navigation and their components
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  { path: "todo", component: TodoComponent },
  {
    path: "timer",
    component: TimerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
