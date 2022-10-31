import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.css']
})
export class ViewTestsComponent implements OnInit {

  tests: any;

  constructor(private _test: TestService) { }

  ngOnInit(): void {
    this._test.tests().subscribe(
      (_data: any) => {
        this.tests = _data;
        console.log(this.tests);
      },
      (_error: any) => {
        console.log(_error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    )
  }

  deleteTest(testId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._test.deleteTest(testId).subscribe(
          (_data: any) => {
            this.tests = this.tests.filter((test: any) => test.testId != testId);
            Swal.fire('Success', 'test is deleted', 'success');
          },
          (_error: any) => {
            console.log(_error);
            Swal.fire('Error', 'error in deleting data', 'error');
          }
        );
      }
    })
  }
}
