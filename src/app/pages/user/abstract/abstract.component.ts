import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.css']
})
export class AbstractComponent implements OnInit {

  testId: any;
  test = {
    testId: 0,
    title: '',
    description: '',
    abstraction: '',
    maxMark: 0,
    numberOfCommonQuestions: 0,
    active: true,

    category: {
      categoryId: '',
    },
  }
  constructor(
    private _route: ActivatedRoute,
    private _test: TestService,
    private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.testId = this._route.snapshot.params['testId'];

    this._test.getTest(this.testId).subscribe(
      (_data: any) => {
        this.test = _data;
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
