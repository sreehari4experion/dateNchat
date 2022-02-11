import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../shared/users';
// import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
// import { ToastrService } from 'ngx-toastr';
// import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  dropdownList = [];
  foodList = [];

  dropdownSettings: IDropdownSettings = {};

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

    //get user id from activateRoute
    this.userId = this.route.snapshot.params['userId'];

    //get user by id
    if (this.userId != 0 || this.userId != null) {
      //get employee
      let userObject = this.usersService.bindUserById(this.userId);
      console.log(userObject);
    } else {
      console.log('no user id');
    }

    //dropdown settings
    this.foodList = [
      { item_id: 1, item_text: 'Apples' },
      { item_id: 2, item_text: 'Bananas' },
      { item_id: 3, item_text: 'Oranges' },
      { item_id: 4, item_text: 'Pears' },
      { item_id: 5, item_text: 'Grapes' },
      { item_id: 6, item_text: 'Pineapples' },
      { item_id: 7, item_text: 'Mangoes' },
      { item_id: 8, item_text: 'Strawberries' },
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
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
