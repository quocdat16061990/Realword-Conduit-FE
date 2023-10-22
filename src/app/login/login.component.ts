import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserAndAuthService } from '../shared/user-and-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly loginForm: any = new FormGroup({
    username: new FormControl('', {
      nonNullable: true
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor(
    private userService: UserAndAuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    console.log('On Init');
  }
  handleSubmit() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Đăng Nhập Thành Công');
        console.log(`response`, response);
      },
      error: (error) => {
        this.toastr.error(error?.error.message);
        console.log('error', error);
      },
    });
  }
}
