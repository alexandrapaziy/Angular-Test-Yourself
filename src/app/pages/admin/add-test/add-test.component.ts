import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {

  public Editor = ClassicEditor;

  categories: any;

  test = {
    title: '',
    description: '',
    abstraction: '',
    maxMark: '',
    numberOfQuestions: '',
    active: true,

    category: {
      categoryId: '',
    },
  }

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _test: TestService) {
  }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (_data: any) => {
        this.categories = _data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );
  }

  addTest() {
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

    this._test.addTest(this.test).subscribe(
      (_data: any) => {
        Swal.fire('Success', 'Test was added', 'success').then(() => {
          window.location.reload();
        });
        this.test.title = '',
          this.test.description = '',
          this.test.abstraction = '',
          this.test.maxMark = '',
          this.test.numberOfQuestions = '',
          this.test.active = true,
          this.test.category = {
            categoryId: '',
          }
      },
      (_error: any) => {
        console.log(_error);
        Swal.fire('Error', 'Server error', 'error');
      }
    );
  }
}


