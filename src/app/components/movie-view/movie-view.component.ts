import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../../models/movie';
import { BudgetPipe } from '../../pipes/budget.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie-view',
  standalone: true,
  imports: [RouterLink, BudgetPipe, DurationPipe],
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.css',
})
export class MovieViewComponent implements OnInit, OnDestroy {
  @Input() movieId!: string;
  movie!: MovieDetails;

  private movieService = inject(MovieService);
  private router = inject(Router);
  private movieSubscription!: Subscription;

  ngOnInit() {
    this.movieSubscription = this.movieService
      .getMovieDetails(this.movieId)
      .subscribe((movie) => {
        this.movie = movie;
      });
  }

  ngOnDestroy() {
    this.movieSubscription?.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
