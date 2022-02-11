import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute
  ) {}
  //declare variables
  userId: number;

  ngOnInit(): void {
    // this.usersService.bindUserById();
    this.usersService.bindMovies();
    this.usersService.bindHobby();
    this.usersService.bindFood();
  }

  //submit form
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.usersService.formData.UserId;
    if (addId == 0 || addId == null) {
      this.insertEmployeeRecord(form);
      console.log('posted');

      this.resetForm(form);
    } else {
      //update
      console.log('updated');
      this.updateEmployeeRecord(form);
      this.resetForm(form);
    }
    //insert or update
  }
  //insert method
  insertEmployeeRecord(form: NgForm) {
    console.log('inserted record');
    console.log(form);
    console.log(form.value);

    this.usersService.insert(form.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update employee record
  updateEmployeeRecord(form: NgForm) {
    console.log('updated record');
    this.usersService.update(form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('success put');
      },
      (error) => {
        console.log(error);
        console.log('error');
      }
    );
  }

  //clear all contents after submit-- initialise
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
}
