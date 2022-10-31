import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(
    private _route: ActivatedRoute,
    private _test: TestService,
    private _category: CategoryService,
    private _router: Router,
    private _snack: MatSnackBar) {
  }

  categories: any;
  testId = 0;
  test: any;

  ngOnInit(): void {
    this.testId = this._route.snapshot.params['testId'];
    this._test.getTest(this.testId).subscribe(
      (data: any) => {
        this.test = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );

    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );
  }

  public updateTest() {
    if (this.test.title.trim() == '' || this.test.title == null) {
      this._snack.open('title is required', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.test.category == null) {
      this._snack.open('category is required', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    this._test.updateTest(this.test).subscribe(
      (_data: any) => {
        Swal.fire('Success', 'test was updating', 'success').then((e) => {
          this._router.navigate(['/admin-dashboard/tests']);
        });
      },
      (_error: any) => {
        console.log(_error);
        Swal.fire('Error', 'error in updating data', 'error');
      }
    );
  }
}
