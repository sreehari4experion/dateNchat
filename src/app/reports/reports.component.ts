import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hobby } from '../shared/hobby';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  //pagination and search
  page: number = 1;
  filter: string;
  userName = localStorage.getItem('userName');
  hobby: {};
  // favHobby:string='';
  constructor(
    public usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.usersService.bindMostLikedHobby();
    this.favHobby();
    console.log('favorite hobby');

    console.log(this.hobby);
  }
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('password');

    this.router.navigate(['/login']);
  }
  favHobby() {
    this.usersService.getmostlikedhobby().subscribe((res) => {
      this.hobby = JSON.stringify(res);
      console.log('response');

      console.log(this.hobby);
    });
  }
}
