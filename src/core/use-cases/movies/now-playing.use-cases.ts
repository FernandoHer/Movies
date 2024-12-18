import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mappers";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { Movie } from "../../entities/movie.entity";



export const MoviesNowPlayingUseCase = async ( fetcher: HttpAdapter ): Promise<Movie[] | undefined | void | any > => {

    try {

        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing')
        return nowPlaying.results.map( MovieMapper.fromMovieDBResultToEmity)
        //return nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEmity(result))
        
    } catch (error) {
        console.log('error', error);
        throw new Error('Error fetching movies - NowPlaying');
    }

}