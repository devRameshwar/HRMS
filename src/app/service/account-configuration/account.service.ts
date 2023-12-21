import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = 'http://localhost:8080/account';

  constructor(private http: HttpClient) { }

  signUp(formData: any) {
    return this.http.post(`${this.baseUrl}/sign-up`, formData);
  }

  sendVerificationCode(email: string) {
    return this.http.post(`${this.baseUrl}/send-verification-code/${email}`, {});
  }

  verifyVerificationCode(accountId: any, formData: any) {
    return this.http.post(`${this.baseUrl}/verify-code/${accountId}`, formData);
  }

  signIn(formData: any) {
    const url = `${this.baseUrl}/sign-in`;
    return this.http.post(url, formData);
  }
}
