import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { CastMapper } from "../../../infrastructure/interfaces/mappers/cast.mapper";
import { MovieDBCastResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { Cast } from "../../entities/cast.entity";


export const getMovieCastUseCase = async ( fetcher: HttpAdapter, movieId: number ): Promise<Cast[]> => {

    try {

			const { cast } = await fetcher.get<MovieDBCastResponse>(`/${movieId}/credits`);

			const actors = cast.map ( CastMapper.fromMovieDBCastToEntity );

			return actors


        
    } catch (error) {
        throw new Error(`Cannot get movie cast : ${ movieId }`)
    }
}