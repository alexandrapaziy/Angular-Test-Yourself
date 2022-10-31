import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonQuestionService } from 'src/app/services/common-question.service';
import { ComplianceQuestionService } from 'src/app/services/compliance-question.service';
import { OpenQuestionService } from 'src/app/services/open-question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  testId: any;
  testTitle: any;
  common_questions: any;
  compliance_questions: any;
  open_questions: any;

  selected = 'all';

  viewValue: string[] = [];
  types = [
    { value: 'common question' },
    { value: 'compliance question' },
    { value: 'open question' },
    { value: 'all' }
  ];


  constructor(
    private _route: ActivatedRoute,
    private _common_question: CommonQuestionService,
    private _compliance_question: ComplianceQuestionService,
    private _open_question: OpenQuestionService) {
  }

  ngOnInit(): void {
    this.testId = this._route.snapshot.params['testId'];
    this.testTitle = this._route.snapshot.params['title'];

    this._common_question.getCommonQuestionsOfTest(this.testId).subscribe(
      (_data: any) => {
        console.log(_data);
        this.common_questions = _data;
      },
      (_error: any) => {
        console.log(_error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );

    this._compliance_question.getComplianceQuestionsOfTest(this.testId).subscribe(
      (_data: any) => {
        console.log(_data);
        this.compliance_questions = _data;
      },
      (_error) => {
        console.log(_error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );

    this._open_question.getOpenQuestionsOfTest(this.testId).subscribe(
      (_data: any) => {
        console.log(_data);
        this.open_questions = _data;
      },
      (_error) => {
        console.log(_error);
        Swal.fire('Error', 'error in loading data', 'error');
      }
    );
  }

  deleteCommonQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._common_question.deleteCommonQuestion(questionId).subscribe(
          (_data: any) => {
            this.common_questions = this.common_questions.filter((question: any) => question.questionId != questionId);
            Swal.fire('Success', 'question is deleted', 'success');
          },
          (_error: any) => {
            console.log(_error);
            Swal.fire('Error', 'error in deleting data', 'error');
          }
        );
      }
    })
  }

  deleteComplianceQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._compliance_question.deleteComplianceQuestion(questionId).subscribe(
          (_data: any) => {
            this.compliance_questions = this.compliance_questions.filter((question: any) => question.questionId != questionId);
            Swal.fire('Success', 'question is deleted', 'success');
          },
          (_error: any) => {
            console.log(_error);
            Swal.fire('Error', 'error in deleting data', 'error');
          }
        );
      }
    })
  }

  deleteOpenQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._open_question.deleteOpenQuestion(questionId).subscribe(
          (_data: any) => {
            this.open_questions = this.open_questions.filter((question: any) => question.questionId != questionId);
            Swal.fire('Success', 'question is deleted', 'success');
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