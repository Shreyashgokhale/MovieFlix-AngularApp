export const API_KEY = "a57f1dd43ea9e87e981bf100565c9553";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3/discover/movie"
export  const  GENRE_FILTERS: any = {
    "action": 28,
    "comedy": 35,
    "drama": 18,
    "horror": 27,
    "scifi": 878,
    "romance": 10749
  };
export const YEAR_DATA = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const REQUIRED_GENRE = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Science Fiction'];
export interface Genre {
    id: number;
    name: string;
  }