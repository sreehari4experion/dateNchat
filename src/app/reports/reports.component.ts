import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    //pagination and search
    page: number = 1;
    filter: string;
    userName = localStorage.getItem('userName');

  constructor(
    public usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

}
