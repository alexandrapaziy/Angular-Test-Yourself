import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonQuestionService } from 'src/app/services/common-question.service';
import { ComplianceQuestionService } from 'src/app/services/compliance-question.service';
import { OpenQuestionService } from 'src/app/services/open-question.service';
import { QuestionMembershipService } from 'src/app/services/question-membership.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  testId: any;
  test: any;


  common_questions: any;
  compliance_questions: any;
  open_questions: any;

  question_membership: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer = 0;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _common_question: CommonQuestionService,
    private _compliance_question: ComplianceQuestionService,
    private _open_question: OpenQuestionService,
    private _question_membership: QuestionMembershipService,
    private _snack: MatSnackBar,
    private _test: TestService) {
  }

  ngOnInit(): void {
    this.preventBackButton();
    this.testId = this._route.snapshot.params['testId'];
    this.loadCommonQuestions();
    this.loadComplianceQuestions();
    this.loadOpenQuestions();
    this.startTimer();
    this.loadQuestionsMembership();
    this.loadTestTitle();
  }

  loadTestTitle() {
    this._test.getTest(this.testId).subscribe(
      (_data: any) => {
        this.test = _data;
      },
      (_error: any) => {
        this._snack.open('Error in loading test title data', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
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
        console.log(this.common_questions);
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

  loadComplianceQuestions() {
    this._compliance_question.getComplianceQuestionsOfTestForTest(this.testId).subscribe(
      (_data: any) => {
        this.compliance_questions = _data;
        this.timer += this.compliance_questions.length * 2 * 60;
        console.log(this.compliance_questions);
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

  loadOpenQuestions() {
    this._open_question.getOpenQuestionsOfTestForTest(this.testId).subscribe(
      (_data: any) => {
        this.open_questions = _data;
        this.timer += this.open_questions.length * 3 * 60;
        console.log(this.open_questions);
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

  preventBackButton() {
    history.pushState(null, '', localStorage['href']);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', localStorage['href']);
    });
  }

  submitTest() {
    Swal.fire({
      title: 'Do you want to submit the test?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluationCommonQuestions();
        this.evaluationComplianceQuestions();
        this.evaluationOpenQuestions();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluationCommonQuestions();
        this.evaluationComplianceQuestions();
        this.evaluationOpenQuestions();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evaluationCommonQuestions() {
    this._common_question.evaluationCommonTest(this.common_questions).subscribe(
      (_data: any) => {
        console.log(_data);
        this.marksGot += (parseFloat(Number(_data.marksGot).toFixed(2))) / 3;
        this.correctAnswers += _data.correctAnswers;
        this.attempted += _data.attempted;
        this.isSubmit = true;
      },
      (_error: any) => {
        this._snack.open('Error in loading data', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }

  evaluationComplianceQuestions() {
    this._compliance_question.evaluationComplianceTest(this.compliance_questions).subscribe(
      (_data: any) => {
        console.log(_data);
        this.marksGot += (parseFloat(Number(_data.marksGot).toFixed(2))) / 3;
        this.correctAnswers += _data.correctAnswers;
        this.attempted += _data.attempted;
        this.isSubmit = true;
      },
      (_error: any) => {
        this._snack.open('Error in loading data', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }

  evaluationOpenQuestions() {
    this._open_question.evaluationOpenTest(this.open_questions).subscribe(
      (_data: any) => {
        console.log(_data);
        this.marksGot += (parseFloat(Number(_data.marksGot).toFixed(2))) / 3;
        this.correctAnswers += _data.correctAnswers;
        this.attempted += _data.attempted;
        this.isSubmit = true;
      },
      (_error: any) => {
        this._snack.open('Error in loading data', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    );
  }

  printPage() {
    window.print();
  }
}
