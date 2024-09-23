import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    // return this.ingredients; //ok
    return this.ingredients.slice(); // work with copy array
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient); //ok
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // } will emmit 1 event for every loop

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log(this.ingredients);
  }
}
