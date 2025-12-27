import { Component, input, OnInit } from '@angular/core';
import { AccountService, AuthService } from '@services/system-services';
import { LoginModel } from '@models/system-models';
import { CategoryService } from '@services/personal-finance-services';
import { OptionModel } from '@models/option.model';
import { NzTreeSelectComponent } from "ng-zorro-antd/tree-select";
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeSelectV1Component } from "@components/selects/tree-select-v1/tree-select-v1.component";
import { InputCurrencyComponent } from "@components/inputs/input-currency/input-currency.component";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
    imports: [CommonModule, FormsModule, TreeSelectV1Component, InputCurrencyComponent]
})
export class TestComponent implements OnInit {

    options: OptionModel[] = [];

    constructor(private authService: AuthService, private account: AccountService, private categoryService: CategoryService,) { }
    ngOnInit(): void {
        this.categoryService.getTreeOptionList().subscribe((res) => {
             this.options = res.data;
        });
    }
    log(event: any) {
        console.log('Selected value:', event);
    }
  
    testLogin() {
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
    testRefreshToken() {
        this.authService.refreshToken().subscribe({
            next: (response) => {
                console.log('Token refreshed successfully:', response);
            },
            error: (error) => {
                console.error('Token refresh failed:', error);
            }
        });
    }
    testCheckLogin() {
        this.authService.checkLogin().subscribe({
            next: (isLoggedIn) => {
                console.log('Is logged in:', isLoggedIn);
            },
            error: (error) => {
                console.error('Check login failed:', error);
            }
        });
    }
    testLogout() {
        this.authService.logOut();
        console.log('Logged out successfully');
    }
    testGetAccounts() {
        this.account.getById(1).subscribe({
            next: (response: any) => {
                console.log('Accounts retrieved successfully:', response);
            },
            error: (error: any) => {
                console.error('Get accounts failed:', error);
            }
        });
    }
}
