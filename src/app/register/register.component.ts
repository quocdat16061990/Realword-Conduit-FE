import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAndAuthService } from '../shared/services/user-and-auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterBodyRequest } from '../shared/services/user-and-auth.service';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TypedFormGroup } from '../shared/utils/typed-form-group';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: any = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    username: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor(
    private userService: UserAndAuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  handleSubmit() {
    this.userService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Đăng Ký Thành Công');
        console.log('res: ', response);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error?.error?.message);
      },
      complete: () => {},
    });
  }
}
