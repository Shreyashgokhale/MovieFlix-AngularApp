import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { GenreFilterComponent } from '../genre-filter/genre-filter.component';
import { CommonModule } from '@angular/common';
import { MovieApisService } from '../../services/movie-apis.service';
import { GENRE_FILTERS, YEAR_DATA } from '../../utils/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MovieListComponent, GenreFilterComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private movieService: MovieApisService) { }
  moviesByYear: any = [];
  allMovies: any = [];

  filteredMovies = this.allMovies;
  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    YEAR_DATA.forEach((currentYear) => {
      this.movieService.getMovies(currentYear).subscribe(data => {
        const movies = data.results;
        this.moviesByYear.push({
          year: currentYear,
          data: movies
        })
      });
    });
    this.filteredMovies = this.moviesByYear;
    this.allMovies = this.moviesByYear;
  }

  getFilteredMovies(year: number, genreId?: number): void {
    YEAR_DATA.forEach((currentYear) => {
      this.movieService.getMovies(year, 1, genreId).subscribe(data => {
        const movies = data.results;
        this.moviesByYear.push({
          year: currentYear,
          data: movies
        })
      });
    })

  }

  // filterMovies(genre: any) {
  //   debugger
  //   if (genre.toLowerCase() === 'all') {
  //     this.filteredMovies = this.allMovies;
  //   }
  //   else {
  //     const genreId = GENRE_FILTERS[genre.toLowerCase()];
  //     if (!genreId) {
  //       return [];
  //     }
  //     this.filteredMovies = []

  //     for (let i = 0; i < YEAR_DATA.length; i++) {
  //       const tempFiltereddata = this.allMovies[i].data.filter((movie: { genre_ids: string | any[]; }) => movie.genre_ids.includes(genreId));
  //       this.filteredMovies.push({
  //         year: YEAR_DATA[i],
  //         data: tempFiltereddata
  //       })
  //     }
  //   }

  //   return this.filteredMovies;
  // }
  filterMovies(selectedGenres: string[]) {
    if (selectedGenres.includes('All')) {
      this.filteredMovies = this.allMovies;
    } else {
      this.filteredMovies = [];

      const selectedGenreIds = selectedGenres.map(genre => GENRE_FILTERS[genre.toLowerCase()]).filter(id => !!id);

      for (let i = 0; i < YEAR_DATA.length; i++) {
        const tempFilteredData = this.allMovies[i].data.filter((movie: { genre_ids: number[] }) =>
          movie.genre_ids.some(id => selectedGenreIds.includes(id))
        );

        this.filteredMovies.push({
          year: YEAR_DATA[i],
          data: tempFilteredData
        });
      }
    }

    return this.filteredMovies;
  }
}
