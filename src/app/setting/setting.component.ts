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
import { Subject, switchMap, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly destroySubject$ = new Subject<void>();
  readonly settingForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
    }),
    email: new FormControl('', {
      nonNullable: true,
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    image: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor() {}
  ngOnInit(): void {
    this.authStore.currentUser
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((user) => {
        this.settingForm.patchValue({
          username: user?.username,
          email: user?.email,
          description: user?.description,
          image: user?.image,
        });
      });
  }
  handleUpdate() {
    this.authStore.update(this.settingForm.getRawValue());
  }
  handleSubmit() {
    this.authStore.logout();
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
