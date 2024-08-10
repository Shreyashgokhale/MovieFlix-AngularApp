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
  filteredMovies: any = [];

  ngOnInit() {
    this.loadMovies();
  }

  // To get all movies year wise & pushed all the objects into array
  loadMovies() {
    YEAR_DATA.forEach((currentYear) => {
      this.movieService.getMovies(currentYear).subscribe(data => {
        const movies = data.results;
        console.log(movies)
        this.moviesByYear.push({
          year: currentYear,
          data: movies
        })
      });
    });
    this.filteredMovies = this.moviesByYear;
    this.allMovies = this.moviesByYear;
  }

  // To filter the data
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
