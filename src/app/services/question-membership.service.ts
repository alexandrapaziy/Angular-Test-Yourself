import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionMembershipService {

  constructor(private _http: HttpClient) { }

  public countQuestionMembership() {
    return this._http.get(`${baseUrl}/membership/`);
  }

  public countQuestionMembershipOfTest(testId: any) {
    return this._http.get(`${baseUrl}/membership/test/${testId}`);
  }
}
