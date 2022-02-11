import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  //get username and password
  //https://localhost:44373/api/Users/GetUser/sreehari&password@123
  // getUserNameAndPassword(user: User): Observable<any> {
  //   console.log(user.UserName);
  //   console.log(user.password);
  //   return this.httpClient.get(
  //     environment.apiUrl +
  //       '/api/Users/GetUser/' +
  //       user.UserName +
  //       '&' +
  //       user.password
  //   );

  //loginverify
  public loginVerify(user: Users) {
    return this.httpClient.get(
      environment.apiUrl + '/api/login/' + user.UserName + '&' + user.Password

      ///api/Login/sreehari&password
    );
    console.log('loginverify');
  }

  //logout
  public logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    sessionStorage.removeItem('userName');
  }
}
