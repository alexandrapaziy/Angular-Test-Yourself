import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: any;

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (_data: any) => {
        this.categories = _data;
      },
      (_error: any) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }
}
