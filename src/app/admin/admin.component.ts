import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  //pagination and search
  page: number = 1;
  filter: string;

  constructor(
    public usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('lifecycle hooks started');
    this.usersService.bindListUsers();
    this.toastr.success('Welcome to Admin Dashboard', 'Success');
  }
  //delete user
  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(
      (res) => {
        // console.log(res.ok);
        console.log(res);
        this.usersService.bindListUsers();
        // window.location.reload();
        this.toastr.success('User deleted successfully', 'Success');
      },
      (error) => {
        console.log(error);
        // window.location.reload();
        this.toastr.error('User not deleted', 'error');
      }
    );
  }
  //update user
  updateUser(id: number) {
    console.log(id);

    this.router.navigate(['adduser', id]);
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
