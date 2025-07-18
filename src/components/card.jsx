import react from 'react';


const Card = (movie) => {
    console.log(movie.info);
    let img_path = "https://image.tmdb.org/t/p/w500";



    return (

        <>
        
            <div className="movie">
                    <img src={img_path+movie.info.poster_path} className='poster'></img>
                    <div className='movie-details'>
                        <div className='box'>
                        <h4 className='tittle'>{movie.info.title}</h4>
                        <p className='rating'>{movie.info.vote_average}</p>
                        </div>
                        <div className='overview'>
                            <h1>Overview</h1>
                            {movie.info.overview}
                        </div>
                    </div>
            </div>
                
            
        </>
    )
}

export default Card;