import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto';
import { FoodDTO } from '../models/food-dto';
import { ExerciseDTO } from '../models/exercise-dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl   = 'http://localhost:8080/users';

    

    constructor(private httpClient: HttpClient) { }

    private userId: number | null = null;

    setUserId(userId: number): void {
        this.userId = userId;
    }

    getUserId(): number | null {
        return this.userId;
    }

    getUserCredentials(name: string, password: string): Observable<UserDTO> {
        const url = `${this.apiUrl}/login/${name}/${password}`;
        return this.httpClient.get<UserDTO>(url);
    }

    insertUser(user: UserDTO): Observable<UserDTO> {
        return this.httpClient.post<UserDTO>(this.apiUrl, user);
    }

    addFoodToUser(userId: number, foodId: number): void {
        const url = `${this.apiUrl}/${userId}/foods/${foodId}`;
        this.httpClient.post(url, {}).subscribe(
          () => {
            console.log('Food added to user successfully.');
            
          },
          (error) => {
            console.error('Failed to add food to user:', error);
            console.log(userId);
            console.log(foodId);
          }
        );
      }

    findById(userId: number): Observable<UserDTO> {
        const url = `${this.apiUrl}/${userId}`
        return this.httpClient.get<UserDTO>(url);
    }


}