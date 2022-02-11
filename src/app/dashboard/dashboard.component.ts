import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //pagination and search
  page: number = 1;
  filter: string;
  userName = localStorage.getItem('userName');

  constructor(
    public usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('lifecycle hooks started');
    this.usersService.bindListUsers();
    this.toastr.success('Welcome ' + this.userName, 'Success');
  }
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('password');

    this.router.navigate(['/login']);
  }
}
