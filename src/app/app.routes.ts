import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: 'movies',
    loadComponent: () =>
      import('./components/movies-list-view/movies-list-view.component').then(
        (c) => c.MoviesListViewComponent,
      ),
  },
  {
    path: 'movies/:movieId',
    loadComponent: () =>
      import('./components/movie-view/movie-view.component').then(
        (c) => c.MovieViewComponent,
      ),
  },
  { path: '**', redirectTo: '/movies' },
];
