import { useState, useEffect } from "react";
import "./App.css";
import {Header} from './components/Header.jsx'
import { MovieList } from "./components/MovieList.jsx";
import {Footer} from './components/Footer.jsx'
import { MovieDisplay } from "./components/MovieDisplay.jsx";
import { Modal } from "./components/Modal.jsx";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [nowPlaying, setNowPlaying] = useState(true)
  const [endPoint, setEndPoint] = useState(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=`)
  const [likedMovies, setLikedMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  
  const handleSearchChange = (event) => {
    if (event.target.value == ''){
        setSearchQuery('')
        setEndPoint(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=`)
        setPageNumber(1)
        return
    }
    setPageNumber(1)
    setSearchQuery(event.target.value);
    setEndPoint(`https://api.themoviedb.org/3/search/movie?query=${event.target.value}&include_adult=false&language=en-US&page=`)
  };

  async function fetchMovies() {
    setMovies([]);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTRmNzY0NzljNTlmY2JlMTg2N2RlMTk5OTUwYTRhNiIsInN1YiI6IjY2Njc2N2UyZWVhZGEwYTlkNWJlNzg5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyNQdzF9SUmFT_U_HKgl6sutF1w3pyvadufBW1rovBE'
      }
    };

    for (let i = 0; i < pageNumber; i++) {
      try {
        const response = await fetch(endPoint + (i + 1), options);
        const data = await response.json();
        setMovies(prev => [...prev, ...data.results]);
      } catch (err) {
        console.error(err);
      }
    }
  }
  useEffect(() => {
    fetchMovies();
  }, [endPoint, pageNumber]);
  

  function handleLoadMore() {
    setPageNumber(pageNumber + 1);
  }
  const toggleMovieInList = (movie) => {
    setLikedMovies(prevList => {
    const index = prevList.findIndex(m => m.id === movie.id);
    if (index === -1) {
    // If the movie is not in the list, add it
    return [...prevList, movie];
    } else {
    // If the movie is in the list, remove it
    return prevList.filter(m => m.id !== movie.id);
    }
    });
    };
  const toggleMovieInWatched = (movie) => {
    setWatchedMovies(prevList => {
    const index = prevList.findIndex(m => m.id === movie.id);
    if (index === -1) {
    // If the movie is not in the list, add it
    return [...prevList, movie];
    } else {
    // If the movie is in the list, remove it
    return prevList.filter(m => m.id !== movie.id);
    }
    });
    };
  function handleMovieSelect(movie){
    setMovie(movie)
  }

  function handleSort(e){
    setEndPoint(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=${e.target.value}&page=`)
  }
  return (
    <div className="App">
      <Header searchQuery={searchQuery} onSelect={handleSort} handleNowPlaying={(now = true)=> {setNowPlaying(now); if(now){ setPageNumber(1); fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=`)}else{setMovies([])}}} shouldSearch={!nowPlaying} onBrowse={handleSearchChange}
    
        />
      {movies.length > 0 && <MovieDisplay title={movies[0].original_title} image={"https://image.tmdb.org/t/p/w500" + movies[0].poster_path} rating={movies[0].vote_average} releaseDate={movies[0].release_date} />}
      <main>
        <div>
          {movies.length > 0 && <MovieList watchedMovies={watchedMovies} onWatch={toggleMovieInWatched} likedMovies={likedMovies} onLiked={toggleMovieInList} onSelect={handleMovieSelect} data={movies}/>}
          {movies.length == 0 && <div style={{backgroundColor: 'aliceblue', height: '110vh'}}></div>}
        </div>
        {movies.length > 0 &&<div className="load-container">
          <button className='load-button' onClick={handleLoadMore}>Load More </button>
        </div>}
      </main>
      {movie && <Modal movie={movie}  onClose={()=>setMovie()}/>}

      <Footer /> 
    </div> 
  );
};

export default App;
