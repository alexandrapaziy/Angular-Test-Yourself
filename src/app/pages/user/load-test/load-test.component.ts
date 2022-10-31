import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-load-test',
  templateUrl: './load-test.component.html',
  styleUrls: ['./load-test.component.css']
})
export class LoadTestComponent implements OnInit {

  categoryId: any;

  tests: any;

  constructor(
    private _route: ActivatedRoute,
    private _test: TestService,
    private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) => {
        this.categoryId = params['categoryId'];

        if (this.categoryId == 0) {
          console.log("Load all the tests");
          this._test.getActiveTests().subscribe(
            (_data: any) => {
              this.tests = _data;
              console.log(this.tests);
            },
            (_error: any) => {
              this._snack.open('Error in loading tests from server', '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }
          )
        } else {
          console.log("Load specific test");
          this._test.getActiveTestsOfCategory(this.categoryId).subscribe(
            (_data: any) => {
              this.tests = _data;
              console.log(this.tests);
            },
            (_error: any) => {
              this._snack.open('Error in loading tests data', '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              });
            }
          );
        }
      }
    );
  }
}
