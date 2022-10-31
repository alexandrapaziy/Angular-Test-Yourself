import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonQuestionService } from 'src/app/services/common-question.service';
import { ComplianceQuestionService } from 'src/app/services/compliance-question.service';
import { OpenQuestionService } from 'src/app/services/open-question.service';
import { QuestionMembershipService } from 'src/app/services/question-membership.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

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
  question_membership: any;
  common_questions: any;
  compliance_questions: any;
  open_questions: any;

  timer = 0;

  constructor(
    private _route: ActivatedRoute,
    private _test: TestService,
    private _snack: MatSnackBar,
    private _router: Router,
    private _question_membership: QuestionMembershipService,
    private _common_question: CommonQuestionService,
    private _compliance_question: ComplianceQuestionService,
    private _open_question: OpenQuestionService,) {
  }

  ngOnInit(): void {
    this.testId = this._route.snapshot.params['testId'];

    this.loadQuestionsMembership();
    this.loadCommonQuestions();
    this.loadComplianceQuestions();
    this.loadOpenQuestions();
    this.getFormatedTime();

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

  startTest() {
    Swal.fire({
      title: 'Do you want to start the test?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.testId]);
      }
    })
  }

  loadQuestionsMembership() {
    this._question_membership.countQuestionMembershipOfTest(this.testId).subscribe(
      (_data: any) => {
        this.question_membership = _data;
        console.log(this.question_membership);
      },
      (_error: any) => {
        this._snack.open('Error in loading question membership data', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }

  loadCommonQuestions() {
    this._common_question.getCommonQuestionsOfTestForTest(this.testId).subscribe(
      (_data: any) => {
        this.common_questions = _data;
        this.timer += this.common_questions.length * 1 * 60;
      },
      (_error: any) => {
      }
    );
  }

  loadComplianceQuestions() {
    this._compliance_question.getComplianceQuestionsOfTestForTest(this.testId).subscribe(
      (_data: any) => {
        this.compliance_questions = _data;
        this.timer += this.compliance_questions.length * 2 * 60;
      },
      (_error: any) => {
      }
    );
  }

  loadOpenQuestions() {
    this._open_question.getOpenQuestionsOfTestForTest(this.testId).subscribe(
      (_data: any) => {
        this.open_questions = _data;
        this.timer += this.open_questions.length * 3 * 60;
      },
      (_error: any) => {
      }
    );
  }

  getFormatedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
}
