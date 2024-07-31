export interface Movie {
  budget: string;
  duration: string;
  id: string;
  release_date: string;
  title: string;
}

export type Movies = Movie[];

export interface MovieDetails extends Movie {
  box_office: string;
  budget: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
