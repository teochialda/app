import { Component, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/models/exercise-dto';
import { FoodDTO } from 'src/app/models/food-dto';
import { ExerciseService } from 'src/app/services/exercise-service';
import { FoodService } from 'src/app/services/food-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {

  foods: FoodDTO[] = [];
  exercises: ExerciseDTO[] = [];
  selectedBreakfast: string = '';
  selectedLunch: string = '';
  selectedDinner: string = '';
  selectedExercise: string = '';

  foodSelectedForBreakfast: FoodDTO[] = [];
  foodSelectedForLunch: FoodDTO[] = [];
  foodSelectedForDinner: FoodDTO[] = [];

  exercisesSelected: ExerciseDTO[] = [];

  constructor(private foodService: FoodService, private exerciseService: ExerciseService, private userService: UserService) {}

  ngOnInit(): void {
    this.getFoods();
    this.getExercises();
  }

  getFoods(): void {
    this.foodService.getAllFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  getExercises(): void {
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  addFoodToMeal(mealType: string): void {
    if (mealType === 'breakfast') {
      this.foodService.getFoodByName(this.selectedBreakfast).subscribe( food => {
        this.foodSelectedForBreakfast.push(food);
        const userId = this.userService.getUserId();
        console.log(userId)
        console.log(food.id)
        const userIdString = localStorage.getItem('userId'); // Retrieve the string value from localStorage
        const userIdBun = parseInt(userIdString); // Convert the string back to a number
        console.log(userIdBun)
        this.userService.addFoodToUser(userIdBun, food.id)
      
        
      });
     
      
    }
    if (mealType === 'lunch') {
      this.foodService.getFoodByName(this.selectedLunch).subscribe( food => {
        this.foodSelectedForLunch.push(food);
      });
    }
    if (mealType === 'dinner') {
      this.foodService.getFoodByName(this.selectedDinner).subscribe( food => {
        this.foodSelectedForDinner.push(food);
      });
    }
  }

  addExercise(): void {
    this.exerciseService.getExerciseByName(this.selectedExercise).subscribe( exercise => {
      console.log(exercise.name);
      this.exercisesSelected.push(exercise);
    })
  }
}
