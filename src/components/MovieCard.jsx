import { useState } from 'react';
import './MovieCard.css';
function formatDate(dateString) {
    // Define month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const [like, setLike] = useState(false)
    const [watched, setWatched] = useState(false)
    // Parse the input date string
    const [year, month, day] = dateString.split('-').map(Number);
  
    // Create a Date object
    const date = new Date(year, month - 1, day);
  
    // Extract the day, month, and year
    const dayNumber = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const yearNumber = date.getFullYear();
  
    // Format the date
    return `${dayNumber} ${monthName}, ${yearNumber}`;
  }
export function MovieCard({image, title, rating, releaseDate, movie, onSelect, onLike, likedMovies, onWatched, watchedMovies}) {
    const isMoviePresent = likedMovies.some(m => m.id === movie.id);
    const isMovieWatched = watchedMovies.some(m => m.id === movie.id);
    return(
        <div className="movie-card">
            <div style={{position: 'relative'}}>
                <div>
                    <div className='card-icon'>
                        <div onClick={()=>{onLike(movie)}}>
                            {!isMoviePresent && <i className="fa-regular fa-beat fa-heart"></i>}
                            {isMoviePresent && <i className="fa-solid fa-heart"></i>}
                        </div>
                        <div onClick={()=>{onWatched(movie)}}>
                            {!isMovieWatched &&<i className="fa-solid  fa-beat fa-plus"></i>}
                            {isMovieWatched && <i className="fa-solid fa-check"></i>}
                        </div>
                    </div>
                    <div>
                        <img onClick={()=>onSelect(movie)} src={image} alt="" className='card-img'></img>
                    </div>
                </div>
            </div>
            <div className='info'>
            <h3 className="movie-title">{title}</h3>
            <p className="movie-rating">Rating: <i className="fa-solid fa-star" style={{color: 'silver '}}></i>{rating.toFixed(1)}</p>
            <p>Released: {formatDate(releaseDate)}</p>
            </div>
        </div>
    )
}
