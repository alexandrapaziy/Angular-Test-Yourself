import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OpenQuestionService } from 'src/app/services/open-question.service';
import { CommonQuestionService } from 'src/app/services/common-question.service';
import { ComplianceQuestionService } from 'src/app/services/compliance-question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  selected = 'common question';

  viewValue: string[] = [];
  types = [
    { value: 'common question' },
    { value: 'compliance question' },
    { value: 'open question' }
  ];

  testId: any;
  testTitle: any;
  common_question = {
    test: {
      testId: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    answer: ''
  }

  compliance_question = {
    test: {
      testId: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  }

  open_question = {
    test: {
      testId: ''
    },
    content: '',
    answer: ''
  }

  constructor(
    private _route: ActivatedRoute,
    private _common_question: CommonQuestionService,
    private _snack: MatSnackBar,
    private _compliance_question: ComplianceQuestionService,
    private _open_question: OpenQuestionService) {
  }

  ngOnInit(): void {
    this.testId = this._route.snapshot.params['testId'];
    this.testTitle = this._route.snapshot.params['title'];
    this.common_question.test['testId'] = this.testId;
    this.compliance_question.test['testId'] = this.testId;
    this.open_question.test['testId'] = this.testId;
  }

  formSubmit() {
    if (this.selected == 'common question') {
      if (this.common_question.content.trim() == '' || this.common_question.content == null) {
        this._snack.open('content is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.common_question.option1.trim() == '' || this.common_question.option1 == null) {
        this._snack.open('option 1 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.common_question.option2.trim() == '' || this.common_question.option2 == null) {
        this._snack.open('option 2 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.common_question.answer.trim() == '' || this.common_question.answer == null) {
        this._snack.open('option answer is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      this._common_question.addCommonQuestion(this.common_question).subscribe(
        (_data: any) => {
          Swal.fire('Success', 'Question was added', 'success').then(() => {
            window.location.reload();
          });
          this.common_question.content = '',
            this.common_question.option1 = '',
            this.common_question.option2 = '',
            this.common_question.option3 = '',
            this.common_question.option4 = '',
            this.common_question.option5 = '',
            this.common_question.answer = '',
            this.common_question.test = {
              testId: '',
            }
        },
        (_error: any) => {
          console.log(_error);
          Swal.fire('Error', 'Server error', 'error');
        }
      );
    } else if (this.selected == 'compliance question') {
      if (this.compliance_question.content.trim() == '' || this.compliance_question.content == null) {
        this._snack.open('content is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.option1.trim() == '' || this.compliance_question.option1 == null) {
        this._snack.open('option 1 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.option2.trim() == '' || this.compliance_question.option2 == null) {
        this._snack.open('option 2 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.optionA.trim() == '' || this.compliance_question.optionA == null) {
        this._snack.open('option A is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.optionB.trim() == '' || this.compliance_question.optionB == null) {
        this._snack.open('option B is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.answer1.trim() == '' || this.compliance_question.answer1 == null) {
        this._snack.open('answer for option 1 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.compliance_question.answer2.trim() == '' || this.compliance_question.answer2 == null) {
        this._snack.open('answer for option 2 is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      this._compliance_question.addComplianceQuestion(this.compliance_question).subscribe(
        (_data: any) => {
          Swal.fire('Success', 'Question was added', 'success').then(() => {
            window.location.reload();
          });
          this.compliance_question.content = '',
            this.compliance_question.option1 = '',
            this.compliance_question.option2 = '',
            this.compliance_question.option3 = '',
            this.compliance_question.option4 = '',

            this.compliance_question.optionA = '',
            this.compliance_question.optionB = '',
            this.compliance_question.optionC = '',
            this.compliance_question.optionD = '',
            this.compliance_question.optionE = '',

            this.compliance_question.answer1 = '',
            this.compliance_question.answer2 = '',
            this.compliance_question.answer3 = '',
            this.compliance_question.answer4 = '',

            this.common_question.test = {
              testId: '',
            }
        },
        (_error: any) => {
          console.log(_error);
          Swal.fire('Error', 'Server error', 'error');
        }
      );
    } else if (this.selected == 'open question') {
      if (this.open_question.content.trim() == '' || this.open_question.content == null) {
        this._snack.open('content is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      if (this.open_question.answer.trim() == '' || this.open_question.answer == null) {
        this._snack.open('answer is required', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        return;
      }

      this._open_question.addOpenQuestion(this.open_question).subscribe(
        (_data: any) => {
          Swal.fire('Success', 'Question was added', 'success').then(() => {
            window.location.reload();
          });
          this.open_question.content = '',
            this.open_question.answer = '',
            this.open_question.test = {
              testId: '',
            }
        },
        (_error: any) => {
          console.log(_error);
          Swal.fire('Error', 'Server error with open question', 'error');
        }
      );
    }
  }
}


