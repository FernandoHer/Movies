import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number,
    limit?: number
}

export const MoviesPopularUseCase = async ( fetcher: HttpAdapter, options?: Options ): Promise<Movie[] | undefined | void | any > => {

    try {

        const popularPlaying = await fetcher.get<MovieDBMoviesResponse>('/popular', {
            params:{
                page: options?.page ?? 1
            }
        })
        return popularPlaying.results.map( MovieMapper.fromMovieDBResultToEmity)
        //return nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEmity(result))
        
    } catch (error) {
        console.log('error', error);
        throw new Error('Error fetching movies - PopularUseCase');
    }

}