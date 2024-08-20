import React from "react";
import "./FeaturedMovie.css";
import { MovieType } from "../../types/Movie";


interface FeaturedMovieProps {
    movie: MovieType;
    transition: boolean;
}
    

export default function FeaturedMovie({ movie, transition }: FeaturedMovieProps) {
    
    const backdrop_path = movie.backdrop_path;
    const name = movie.name ?? movie.title;
    const description = movie.overview.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview;
    const year = new Date(movie.first_air_date ?? movie.release_date).getFullYear();
    const seasons = movie.number_of_seasons;
    const genres: string[] = (movie.genres ?? []).map(genre => genre.name)
    const genresString = genres.join(', ')
    const vote_average = movie.vote_average;

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className={`featured--horizontal ${transition ? 'hidden' : ''}`}>
                    <div className="featured--name">{name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{vote_average} ponto{vote_average !== 1 ? 's' : ''}</div>
                        <div className="featured--year">{year}</div>
                        {seasons && (
                            <div className="featured--seasons">{seasons} temporada{seasons !== 1 ? 's' : ''}</div>
                        )}
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${movie.id}`} className="featured--watch-button">► Assistir</a>
                        <a href={`/list/add/${movie.id}`} className="featured--myList-button">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genresString}</div>
                </div>
            </div>
        </section>
    );
}