import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mappers";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.response";
import { FullMovie } from '../../entities/movie.entity';


export const getMovieByIdUseCase = async (
    fetcher: HttpAdapter,
    movieId: number) : Promise<FullMovie> => {

        try {
            
            const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`)
            const fullMovie = MovieMapper.fromMovieDbToEntity(movie);
            return fullMovie;

        } catch (error) {
            throw new Error(`Cannot get movie by id: ${movieId}`);
            
        }
    }
