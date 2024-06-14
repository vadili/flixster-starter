import './MovieList.css';
import { MovieCard } from './MovieCard.jsx';

export function MovieList({data, onSelect, likedMovies, onLiked, watchedMovies, onWatch}) {
    return(
        
        <div className="movie-cards">
            {
                data.map((movie, idx)=>{if (movie.poster_path && movie.original_title) { return  <MovieCard key={idx} onWatched={onWatch} watchedMovies={watchedMovies} likedMovies={likedMovies} onLike={onLiked} onSelect={onSelect} movie={movie} title={movie.original_title} image={"https://image.tmdb.org/t/p/w500" + movie.poster_path} rating={movie.vote_average} releaseDate={movie.release_date}/>}}
                )
            }
        </div>
    )
}
