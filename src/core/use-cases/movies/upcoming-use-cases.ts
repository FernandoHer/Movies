import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mappers";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { Movie } from "../../entities/movie.entity";



export const MoviesUpcomingUseCase = async ( fetcher: HttpAdapter ): Promise<Movie[] | undefined | void | any > => {

    try {

        const upcominglaying = await fetcher.get<NowPlayingResponse>('/upcoming')
        return upcominglaying.results.map( MovieMapper.fromMovieDBResultToEmity)
        //return nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEmity(result))
        
    } catch (error) {
        console.log('error', error);
        throw new Error('Error fetching movies - UpcommingUseCase');
    }

}