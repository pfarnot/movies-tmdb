const Movie = ({ title, index, overview, poster_path }) => {
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500/';
    return (
        <div className="movie" key={index} >
            <h3>{title}</h3>
            <img src={IMAGES_API + poster_path} alt={title} style={{height: 300, width: 350}}></img>
            <div className="movie-overview">{overview}</div>
        </div>
    )
}
export default Movie