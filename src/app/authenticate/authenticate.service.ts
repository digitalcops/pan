import { SharedService } from './../shared/shared.service';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    public sharedService: SharedService
  ) { }

  isAdminLoggedIn(){
    return true;
  }

  /**
   * API call for login
   * @param data Form data
   */
  login(data) {
    const url = config.login;
    return this.sharedService.postData(url, data);
  }

  /**
   * API call for Forgot password
   * @param email Email
   */
  forgotPassword(email): Observable<any> {
    let forgotPasswordUrl = config.forgetPassword;
    forgotPasswordUrl = forgotPasswordUrl.replace(':email', email);
    return this.sharedService.getData(forgotPasswordUrl);
  }

  /**
   * API call to Reset password
   * @param data Form data
   */
  resetPassword(data): Observable<any> {
    const url = config.resetPassword;
    return this.sharedService.putData(url, data);
  }

  /**
   * API call to Activate Email
   * @param data Form data
   */
  activateEmail(data): Observable<any> {
    const url = config.activateUser;
    return this.sharedService.putData(url, data);
  }

  /**
   * API call to Verify Email
   * @param data Form data
   */
  verifyEmail(data): Observable<any> {
    const url = config.verifyEmail;
    return this.sharedService.putData(url, data);
  }

    /**
     * API call to Verify User Email
     * @param data Form data
     */
  verifyUserEmail(data): Observable<any> {
    const url = config.verifyUserEmail;
    return this.sharedService.putData(url, data);
  }

  /**
   * API call to Sign up user
   * @param data Form data
   */
  signup(data): Observable<any> {
    const url = config.signUp;
    return this.sharedService.postData(url, data);
  }

  /**
   * API call to logout user
   */
  logout(): Observable<any> {
    const url = config.logout;
    return this.sharedService.getData(url);
  }

}
