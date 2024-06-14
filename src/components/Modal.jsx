import { useEffect, useState } from 'react';
import './Modal.css';

function formatDate(dateString) {
    // Define month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
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
export function Modal({movie, onClose}) {
    const [details, setDetails] = useState()
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTRmNzY0NzljNTlmY2JlMTg2N2RlMTk5OTUwYTRhNiIsInN1YiI6IjY2Njc2N2UyZWVhZGEwYTlkNWJlNzg5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyNQdzF9SUmFT_U_HKgl6sutF1w3pyvadufBW1rovBE'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options)
            .then(response => response.json())
            .then(response =>setDetails(response))
            .catch(err => console.error(err));
    }, [])
    let genre = 'Genres:   '
    if (details){
        for (var i = 0; i < details.genres.length; i ++ ){
            genre +=  ' ' +  details.genres[i].name
        }
    }

    const [videoKey, setVideoKey] = useState('');
   useEffect(() => {
       const fetchVideo = async () => {
       const apiKey = import.meta.env.VITE_API_KEY;
       const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);
       const data = await response.json();
       const youtubeVideo = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
       setVideoKey(youtubeVideo ? youtubeVideo.key : '');
       };

       fetchVideo();
   }, [movie.id]);

    return(
        <div className='backdrop'>
            <div className="backdrop-card">
            <div className='backdrop-image'>
            <div className='imageContainer'>
                    <img className='movie-poster' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                </div>
            <button className='close' onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
            <div className='imageBackground'>
                <img src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt=""></img>
                <div className='filter'></div>
            </div>
            <div className="backdrop-title">
            <h3>{movie.title}</h3>
            {details && <p className='tagline'>.......{details.tagline}</p>}
            </div>
            </div>
            <div className='bottom'>
               
                { details && <div className='Description'>
                    <p>{details.overview}</p>
                </div>}
                <div className='more'>
                    <p>{genre}</p>
                    {details && <p>Runtime:  {details.runtime} mins</p>}
                    <p>Released: {formatDate(movie.release_date)}</p>
                </div>
                <iframe
                       width="560px"
                       height="315px"
                       src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                       title="YouTube video player" frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                       referrerPolicy="strict-origin-when-cross-origin"
                       allowFullScreen></iframe>
            </div>
            </div>
        </div>
        
    )
}
