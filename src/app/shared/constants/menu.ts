export interface NavBarMenu {
  path: string;
  title: string;
  icon?: string;
}

export const NON_AUTH_MENU: NavBarMenu[] = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: 'login',
    title: 'Sign in',
  },
  {
    path: 'register',
    title: 'Sign up',
  },
];

export const AUTH_MENU: NavBarMenu[] = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: 'editor',
    title: 'New Article',
    icon: 'fa-solid fa-pen-to-square',
  },
  {
    path: 'settings',
    title: 'Settings',
    icon: 'fa-solid fa-gear',
  },
  {
    path: 'profile',
    title: 'Profile',
  },
];
