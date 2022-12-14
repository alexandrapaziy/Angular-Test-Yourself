import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public Editor = ClassicEditor;

  category = {
    title: '',
    description: '',
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title is required', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('title is required', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (_data: any) => {
        Swal.fire('Success', 'Category was added', 'success').then(() => {
          window.location.reload();
        });
        this.category.title = '',
          this.category.description = ''
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Server error', 'error');
      }
    );
  }
}
