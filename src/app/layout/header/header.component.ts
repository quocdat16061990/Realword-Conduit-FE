import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from 'src/app/shared/store/auth';
import {
  AUTH_MENU,
  NON_AUTH_MENU,
  NavBarMenu,
} from 'src/app/shared/constants/menu';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly #authStore = inject(AuthStore);
  users: any;
  private authSubscription!: Subscription;
  private isAuthenticated: boolean = false;
  public menuItems: NavBarMenu[] = NON_AUTH_MENU;

  ngOnInit(): void {
    this.authSubscription = this.#authStore.isAuthenticated.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.#authStore.currentUser.subscribe((user) => {
            if (user && user.username) {
              this.menuItems = AUTH_MENU.map((item) => {
                if (item.title === 'Profile') {
                  return { ...item, title: user.username, path: user.username };
                }

                return item;
              });
            }
          });
        } else {
          this.menuItems = NON_AUTH_MENU;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
