import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginData = {
    username: '',
    password: '',
  }

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log('login button clicked');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required", '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required", '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (_data: any) => {
        console.log('success');
        console.log(_data);

        this.login.loginUser(_data.token);
        this.login.getCurrentUser().subscribe(
          (_user: any) => {
            this.login.setUser(_user);
            console.log(_user);

            if (this.login.getUserRole() == 'ADMIN') {
              this.router.navigate(['admin-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'NORMAL') {
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          });
      },
      (_error: any) => {
        console.log('Error');
        console.log(_error);
        this.snack.open('Invalid details, try again', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }
}
