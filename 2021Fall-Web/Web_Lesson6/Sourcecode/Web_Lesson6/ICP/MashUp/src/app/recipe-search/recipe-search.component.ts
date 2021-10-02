import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  public recipeName;
  public recipeList = [];
  public ingredientList = [];
  public selectedRecipe;
  public processSteps = [];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private http:HttpClient) {}

  ngOnInit() {
  }

  getRecipes() {
    this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${this.recipeName}&apiKey=79fb28cac7b943268ebd5d8edb109a43`).subscribe(data => {
      const recipes = data['results'].slice(0, 4);
      this.recipeList = recipes;
    })
  }

  openDetails(recipe, template: TemplateRef<any>) {
    this.selectedRecipe = recipe;
    this.ingredientList = [];
    this.http.get(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=79fb28cac7b943268ebd5d8edb109a43`).subscribe(data => {
      const steps = data[0]['steps'];
      console.log(data,steps);
      steps.map(step => {
        const ingredient = step.ingredients.map(ing => ing.name)
        this.ingredientList.push(...ingredient);
        const process = {
          number: step.number,
          desc: step.step
        }
        this.processSteps.push(process);
      });
    })
    this.modalRef = this.modalService.show(template, {class:'recipe-modal'});
  }
}
