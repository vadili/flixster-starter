import './Header.css'

export function Header({onBrowse, searchQuery, shouldSearch, handleNowPlaying , onSelect}) {
  
  return (
    <header>
      <div className="header">
        <div className='tag'>
        <h1 onClick={()=>handleNowPlaying(true)} >F</h1>
        <button onClick={()=>handleNowPlaying(true)}>Now Playing</button>
        <select onChange={(e)=>onSelect(e)} id="choice">
          <option value={'default'}>Sort by</option>
          <option value={'original_title.asc'}>Title</option>
          <option value={'popularity.desc'}>Popularity</option>
          <option value={'primary_release_date.desc'}>Date</option>
          <option value={'vote_average.desc'}>Average Vote</option>
        </select>
        </div>
        <div className="search-sort">
         {shouldSearch && <input type="text" value={searchQuery} onChange={onBrowse} placeholder="Search" />}
          {!shouldSearch && <button onClick={()=>{handleNowPlaying(false)}}><i className="fa-solid fa-magnifying-glass"></i></button>}
        </div>
      </div>
    </header>
  );
}
