import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MovieViewComponent } from './movie-view.component';
import { MovieService } from '../../services/movie.service';
import { MovieDetails } from '../../models/movie';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieViewComponent', () => {
  let component: MovieViewComponent;
  let fixture: ComponentFixture<MovieViewComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovieDetails']);

    await TestBed.configureTestingModule({
      imports: [MovieViewComponent, RouterTestingModule],
      providers: [{ provide: MovieService, useValue: spy }],
    }).compileComponents();

    mockMovieService = TestBed.inject(
      MovieService,
    ) as jasmine.SpyObj<MovieService>;

    fixture = TestBed.createComponent(MovieViewComponent);
    component = fixture.componentInstance;
    component.movieId = '1';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    const mockMovieDetails: MovieDetails = {
      id: '1',
      title: 'Test Movie',
      release_date: '2022-01-01',
      budget: '100',
      duration: '120',
    } as MovieDetails;

    mockMovieService.getMovieDetails.and.returnValue(of(mockMovieDetails));

    component.ngOnInit();

    expect(mockMovieService.getMovieDetails).toHaveBeenCalledWith('1');
    expect(component.movie).toEqual(mockMovieDetails);
  });
});
