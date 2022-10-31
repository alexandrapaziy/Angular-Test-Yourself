import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CommonQuestionService {

  constructor(private _http: HttpClient) { }

  public getCommonQuestionsOfTest(testId: any) {
    return this._http.get(`${baseUrl}/common-question/test/all/${testId}`);
  }

  public getCommonQuestionsOfTestForTest(testId: any) {
    return this._http.get(`${baseUrl}/common-question/test/${testId}`);
  }

  public addCommonQuestion(common_question: any) {
    return this._http.post(`${baseUrl}/common-question/`, common_question);
  }

  public deleteCommonQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/common-question/${questionId}`);
  }

  public updateCommonQuestion(common_question: any) {
    return this._http.put(`${baseUrl}/common-question/`, common_question);
  }

  public evaluationCommonTest(questions: any) {
    return this._http.post(`${baseUrl}/common-question/evaluation-test`, questions);
  }
}