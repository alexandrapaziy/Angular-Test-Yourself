import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  constructor(
    private userService: UserService,
    private snack: MatSnackBar) {
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null
      || this.user.password == '' || this.user.password == null
      || this.user.firstName == '' || this.user.firstName == null
      || this.user.lastName == '' || this.user.lastName == null
      || this.user.email == '' || this.user.email == null
      || this.user.phone == '' || this.user.phone == null) {
      this.snack.open('Some field was left empty', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (_data: any) => {
        console.log(_data);
        Swal.fire('Success', 'User is registered', 'success');
      },
      (_error: any) => {
        console.log(_error);
        this.snack.open('This username is already exists', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    )
  }
}
