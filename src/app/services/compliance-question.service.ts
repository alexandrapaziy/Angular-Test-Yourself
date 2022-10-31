import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ComplianceQuestionService {

  constructor(private _http: HttpClient) { }

  public getComplianceQuestionsOfTest(testId: any) {
    return this._http.get(`${baseUrl}/compliance-question/test/all/${testId}`);
  }

  public getComplianceQuestionsOfTestForTest(testId: any) {
    return this._http.get(`${baseUrl}/compliance-question/test/${testId}`);
  }

  public addComplianceQuestion(compliance_question: any) {
    return this._http.post(`${baseUrl}/compliance-question/`, compliance_question);
  }

  public deleteComplianceQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/compliance-question/${questionId}`);
  }

  public evaluationComplianceTest(questions: any) {
    return this._http.post(`${baseUrl}/compliance-question/evaluation-test`, questions);
  }
}