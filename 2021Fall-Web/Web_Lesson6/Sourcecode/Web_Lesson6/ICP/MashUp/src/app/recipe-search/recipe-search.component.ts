import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-recipe-search",
  templateUrl: "./recipe-search.component.html",
  styleUrls: ["./recipe-search.component.css"],
})
export class RecipeSearchComponent implements OnInit {
  // initializing values
  public recipeName;
  public recipeList = [];
  public ingredientList = [];
  public selectedRecipe;
  public processSteps = [];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private http: HttpClient) {}

  ngOnInit() {}

  // this method will be called on click of get recipes
  getRecipes() {
    /* 
    ajax call for making http call for recipes
    Observable will be cold untill it gets subscribed

    Streams of data pushing into the recipes variable
    */
    this.http
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${this.recipeName}&apiKey=7330649a12664a7caed7dbb1f169085b`
      )
      .subscribe((data) => {
        const recipes = data["results"].slice(0, 4);
        this.recipeList = recipes;
      });
  }

  /*
   * When user clicks on details of that ingredient, modal will be opened with the details of that recipe
   */
  openDetails(recipe, template: TemplateRef<any>) {
    this.selectedRecipe = recipe;
    this.ingredientList = [];
    this.http
      .get(
        `https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=7330649a12664a7caed7dbb1f169085b`
      )
      .subscribe((data) => {
        const steps = data[0]["steps"];
        console.log(data, steps);
        steps.map((step) => {
          const ingredient = step.ingredients.map((ing) => ing.name);
          this.ingredientList.push(...ingredient);
          const process = {
            number: step.number,
            desc: step.step,
          };
          this.processSteps.push(process);
        });
      });

    // After making the user data ready modal is shown
    this.modalRef = this.modalService.show(template, { class: "recipe-modal" });
  }
}
