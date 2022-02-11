import { Injectable } from '@angular/core';
import { Users } from '../shared/users';
import { Hobby } from '../shared/hobby';
import { Food } from '../shared/food';
import { Genre } from '../shared/genre';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // retrieve all data from users
  users: Users[] = [];
  // users = Users[];
  formData: Users = new Users();
  hobbies: Hobby[];
  foods: Food[];
  genre: Genre[];

  constructor(private httpClient: HttpClient) {}

  bindListUsers() {
    this.httpClient
      .get(environment.apiUrl + '/api/users/getusers')
      .toPromise()
      .then((res) => {
        this.users = res as Users[];
        console.log(res);
        console.log(this.users);
      });
  }
  bindUserById(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/users/' + id)
      .toPromise()
      .then((res) => {
        this.formData = res as Users;
        console.log(res);
        console.log(this.formData);
      });
  }

  //insert user
  insert(user: Users): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/Users', user);
  }

  //update employee
  update(user: Users): Observable<any> {
    return this.httpClient.put(environment.apiUrl + '/api/Users', user);
  }

  //delete employee
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + '/api/Users/' + id);
  }

  // deleteUser(id: number) {
  //   this.httpClient
  //     .delete(environment.apiUrl + '/api/Users/' + id)
  //     .toPromise()
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }

  bindHobby() {
    this.httpClient
      .get(environment.apiUrl + '/api/hobbies')
      .toPromise()
      .then((res) => {
        this.hobbies = res as Hobby[];
        console.log(res);
        console.log(this.hobbies);
      });
  }

  bindMovies() {
    this.httpClient
      .get(environment.apiUrl + '/api/movies')
      .toPromise()
      .then((res) => {
        this.genre = res as Genre[];
        console.log(res);
        console.log(this.hobbies);
      });
  }

  bindFood() {
    this.httpClient
      .get(environment.apiUrl + '/api/food')
      .toPromise()
      .then((res) => {
        this.foods = res as Food[];
        console.log(res);
        console.log(this.hobbies);
      });
  }
  bindMostLikedHobby() {
    this.httpClient
      .get(environment.apiUrl + '/api/Users/GetMostLikedHobby')
      .toPromise()
      .then((res) => {
        this.hobbies = res as Hobby[];
        console.log(res);
        console.log(this.hobbies);
      });
  }
  getmostlikedhobby(){
    return this.httpClient.get(environment.apiUrl + '/api/users/getmostlikedhobby');
  }
}
