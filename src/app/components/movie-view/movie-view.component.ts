import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../models/movie';
import { BudgetPipe } from '../../pipes/budget.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-view',
  standalone: true,
  imports: [RouterLink, BudgetPipe, DurationPipe, AsyncPipe],
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.css',
})
export class MovieViewComponent implements OnInit {
  @Input() movieId!: string;
  movie$!: Observable<MovieDetails>;

  private movieService = inject(MovieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.movie$ = this.movieService.getMovieDetails(this.movieId);
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
