import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService, AuthService } from '@services/system-services';
import { LoginModel } from '@models/system-management-models';
import { QuestionGroupLibrariesComponent } from '../surveys/extension/question-group-libraries/question-group-libraries.component';
import { QuestionGroupLibraryService } from '@services/survey-services';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: []
})
export class TestComponent {
    constructor(private authService: AuthService, private account: AccountService) {}

    testLogin(){
      const login: LoginModel = {
        username: 'admin',
        password: '1q2w3e4r',
        rememberMe: false
      };
        this.authService.login(login).subscribe({
            next: (response) => {
                console.log('Login successful:', response);
            },
            error: (error) => {
                console.error('Login failed:', error);
            }
        });
    }

    testRefreshToken(){
        this.authService.refreshToken().subscribe({
            next: (response) => {
                console.log('Token refreshed successfully:', response);
            },
            error: (error) => {
                console.error('Token refresh failed:', error);
            }
        });
      }
    testCheckLogin(){
        this.authService.checkLogin().subscribe({
            next: (isLoggedIn) => {
                console.log('Is logged in:', isLoggedIn);
            },
            error: (error) => {
                console.error('Check login failed:', error);
            }
        });
    }

    testLogout(){
        this.authService.logOut();
        console.log('Logged out successfully');
    }

   
    testGetAccounts(){
        this.account.getById(1).subscribe({
            next: (response : any) => {
                console.log('Accounts retrieved successfully:', response);
            },
            error: (error: any) => {
                console.error('Get accounts failed:', error);
            }
        });
    }
}
