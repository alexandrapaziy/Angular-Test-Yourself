import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _http: HttpClient) { }

  public tests() {
    return this._http.get(`${baseUrl}/test/`);
  }

  public addTest(test: any) {
    return this._http.post(`${baseUrl}/test/`, test);
  }

  public deleteTest(testId: any) {
    return this._http.delete(`${baseUrl}/test/${testId}`);
  }

  public getTest(testId: any) {
    return this._http.get(`${baseUrl}/test/${testId}`);
  }

  public updateTest(test: any) {
    return this._http.put(`${baseUrl}/test/`, test);
  }

  public getTestsOfCategory(categoryId: any) {
    return this._http.get(`${baseUrl}/test/category/${categoryId}`);
  }

  public getActiveTests() {
    return this._http.get(`${baseUrl}/test/active`);
  }

  public getActiveTestsOfCategory(categoryId: any) {
    return this._http.get(`${baseUrl}/test/category/active/${categoryId}`);
  }
}
