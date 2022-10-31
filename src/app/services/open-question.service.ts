import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class OpenQuestionService {

  constructor(private _http: HttpClient) { }

  public getOpenQuestionsOfTest(testId: any) {
    return this._http.get(`${baseUrl}/open-question/test/all/${testId}`);
  }

  public getOpenQuestionsOfTestForTest(testId: any) {
    return this._http.get(`${baseUrl}/open-question/test/${testId}`);
  }

  public addOpenQuestion(open_question: any) {
    return this._http.post(`${baseUrl}/open-question/`, open_question);
  }

  public deleteOpenQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/open-question/${questionId}`);
  }

  public evaluationTest(questions: any) {
    return this._http.post(`${baseUrl}/open-question/evaluation-test`, questions);
  }

  public evaluationOpenTest(questions: any) {
    return this._http.post(`${baseUrl}/open-question/evaluation-test`, questions);
  }
}
