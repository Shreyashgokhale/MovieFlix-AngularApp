import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Genre, REQUIRED_GENRE } from '../../utils/constants';
import { MovieApisService } from '../../services/movie-apis.service';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-filter.component.html',
  styleUrl: './genre-filter.component.css'
})
export class GenreFilterComponent {
  @Output() genreSelected = new EventEmitter<string[]>();
  genres: Genre[] | undefined;
  selectedGenres: string[] = ['All'];

  constructor(private movieService: MovieApisService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Fetch genres on component initialization
    this.movieService.getGenres().subscribe(data => {
      this.genres = data.genres.filter((genre: { name: any; }) => REQUIRED_GENRE.includes(genre.name))
      .map((genre: { name: string }) => {
        // Rename "Science Fiction" to "Sci-Fi"
        if (genre.name.toLowerCase() === 'science fiction') {
          genre.name = 'Sci-Fi';
        }
        return genre;
      });;
    });
  }
  selectGenre(genre: string) {
    if (genre === 'All') {
      this.selectedGenres = ['All'];
    } else {
      // Remove 'All' if any other genre is selected
      if (this.selectedGenres.includes('All')) {
        this.selectedGenres = [];
      }

      const index = this.selectedGenres.indexOf(genre);
      if (index > -1) {
        this.selectedGenres.splice(index, 1); // Deselect the genre
      } else {
        this.selectedGenres.push(genre); // Select the genre
      }

      // If no genres are selected, default to 'All'
      if (this.selectedGenres.length === 0) {
        this.selectedGenres = ['All'];
      }
    }
    
    this.genreSelected.emit(this.selectedGenres);
  }

  isSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
