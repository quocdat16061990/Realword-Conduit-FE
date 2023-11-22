import { Routes } from '@angular/router';

const editorRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./new-article/new-article.component').then(
        (m) => m.NewArticleComponent
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./edit-article/edit-article.component').then(
        (m) => m.EditArticleComponent
      ),
  },
];

export default editorRoutes;
