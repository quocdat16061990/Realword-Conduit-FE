import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserAndAuthService } from '../shared/services/user-and-auth.service';
import { AuthStore } from '../shared/store/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly #authStore = inject(AuthStore);
  readonly loginForm: any = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor(
    private userService: UserAndAuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  handleSubmit() {
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        this.#authStore.login(this.loginForm.value);
        this.toastr.success('Đăng Nhập Thành Công');
        this.router.navigate(['']);
      },
      error: (error) => {
        this.toastr.error(error?.error.message);
        console.log('error', error);
      },
    });
  }
}
