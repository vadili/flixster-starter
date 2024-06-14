import './MovieDisplay.css';
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
export function MovieDisplay({image, title, rating, releaseDate}) {
    return(
        <div className="movie-display">
            <div className='text-box'>
                <div className='text'>
                    <h3 className="movie-title">{title}</h3>
            <p className="movie-rating"><p className="movie-rating">Rating: <i className="fa-solid fa-star" style={{color: 'silver'}}></i>{rating.toFixed(1)}</p></p>
            <p>Released: {formatDate(releaseDate)}</p>
            </div>
            
            </div>
            <img  src={image} alt=""></img>
            
        </div>
    )
}
