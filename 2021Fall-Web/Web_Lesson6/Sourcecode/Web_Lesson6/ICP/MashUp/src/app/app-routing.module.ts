import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';

const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantSearchComponent
  },
  {
    path: 'recipes',
    component: RecipeSearchComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
