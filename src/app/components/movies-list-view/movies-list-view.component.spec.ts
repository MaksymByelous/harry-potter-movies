import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MoviesListViewComponent } from './movies-list-view.component';
import { MovieService } from '../../services/movie.service';
import { Movies } from '../../models/movie';
import { ReactiveFormsModule } from '@angular/forms';

describe('MoviesListViewComponent', () => {
  let component: MoviesListViewComponent;
  let fixture: ComponentFixture<MoviesListViewComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [MoviesListViewComponent, ReactiveFormsModule],
      providers: [{ provide: MovieService, useValue: spy }],
    }).compileComponents();

    mockMovieService = TestBed.inject(
      MovieService,
    ) as jasmine.SpyObj<MovieService>;
    fixture = TestBed.createComponent(MoviesListViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    const mockMovies: Movies = [
      { id: '1', title: 'Test Movie', release_date: '2022-01-01' },
    ] as Movies;

    mockMovieService.getMovies.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovies);
    expect(component['moviesInitial']).toEqual(mockMovies);
  });

  it('should filter movies correctly', () => {
    const mockMovies: Movies = [
      { id: '1', title: 'Test Movie', release_date: '2022-01-01' },
      { id: '2', title: 'Another Movie', release_date: '2021-01-01' },
    ] as Movies;

    component['moviesInitial'] = mockMovies;

    component['filterMovies']({ title: 'Test', year: 2022 });

    expect(component.movies).toEqual([
      { id: '1', title: 'Test Movie', release_date: '2022-01-01' },
    ] as Movies);
  });
});
