import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { Movie } from "../../entities/movie.entity";



export const MoviesTopRatedUseCase = async ( fetcher: HttpAdapter ): Promise<Movie[] | undefined | void | any > => {

    try {

        const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated')
        return topRated.results.map( MovieMapper.fromMovieDBResultToEmity)
        //return nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEmity(result))
        
    } catch (error) {
        console.log('error', error);
        throw new Error('Error fetching movies - Top Rated');
    }

}