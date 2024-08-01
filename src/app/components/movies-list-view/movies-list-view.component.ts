import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movies } from '../../models/movie';
import { filter, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import { BudgetPipe } from '../../pipes/budget.pipe';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-movies-list-view',
  standalone: true,
  imports: [CurrencyPipe, DurationPipe, BudgetPipe, ReactiveFormsModule],
  templateUrl: './movies-list-view.component.html',
  styleUrl: './movies-list-view.component.css',
})
export class MoviesListViewComponent implements OnInit, OnDestroy {
  filtersForm!: FormGroup;
  startYear: number = 1888;
  currentYear: number = new Date().getFullYear();
  movies: Movies = [];

  private movieService = inject(MovieService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  private moviesInitial: Movies = [];
  private moviesSubscription!: Subscription;
  private filtersSubscription!: Subscription;

  ngOnInit(): void {
    this.filtersForm = this.formBuilder.group({
      title: [''],
      year: [
        null,
        [Validators.min(this.startYear), Validators.max(this.currentYear)],
      ],
    });

    this.moviesSubscription = this.movieService
      .getMovies()
      .subscribe((movies) => {
        this.moviesInitial = movies;
        this.movies = movies;
      });

    this.filtersSubscription = this.filtersForm.valueChanges
      .pipe(filter(() => this.filtersForm.valid))
      .subscribe((value: Filters) => {
        this.filterMovies(value);
      });
  }

  ngOnDestroy(): void {
    this.moviesSubscription?.unsubscribe();
    this.filtersSubscription?.unsubscribe();
  }

  openDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

  private filterMovies(filters: Filters): void {
    this.movies = this.moviesInitial.filter((movie) => {
      let matchesTitle = true;
      let matchesYear = true;

      if (filters.title) {
        matchesTitle = movie.title
          .toLowerCase()
          .includes(filters.title.toLowerCase());
      }

      if (filters.year) {
        const releaseYear = new Date(movie.release_date).getFullYear();
        matchesYear = releaseYear === filters.year;
      }

      return matchesTitle && matchesYear;
    });
  }
}
