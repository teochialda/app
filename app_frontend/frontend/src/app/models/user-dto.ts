export class UserDTO {
    id: number;
    name: string;
    password: string;
    age: number;
    calories: number;
    kilograms: number;
    foods: Set<number>;
    exercises: Set<number>;
}