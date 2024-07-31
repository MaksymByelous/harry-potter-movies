import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movies, MovieDetails } from '../models/movie';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', () => {
    const mockMovies: Movies = [
      { id: '1', title: 'Test Movie', release_date: '2022-01-01' },
    ] as Movies;

    service.getMovies().subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movie details', () => {
    const mockMovieDetails: MovieDetails = {
      id: '1',
      title: 'Test Movie',
      release_date: '2022-01-01',
      budget: '100',
      duration: '120',
    } as MovieDetails;

    service.getMovieDetails('1').subscribe((movieDetails) => {
      expect(movieDetails).toEqual(mockMovieDetails);
    });

    const req = httpMock.expectOne('/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetails);
  });
});
