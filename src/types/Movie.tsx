
export interface Genre {
    id: number;
    name: string;
  }

export interface MovieType {
    id?: number;
    backdrop_path?: string;
    name: string;
    title: string;
    overview: string;
    first_air_date: string;
    release_date: string;
    number_of_seasons?: number;
    genres?: Genre[];
    vote_average: number;
  }