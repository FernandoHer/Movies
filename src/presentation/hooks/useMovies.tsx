import { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'

import * as UseCases from '../../core/use-cases';
import { movieDbFetcher } from '../../config/adapters/movieDb.adapter';

let popularPage = 1;

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcomming, setUpcomming] = useState<Movie[]>([]);
  const [toptRated, setToptRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, [])

  const initialLoad = async () => {
    const nowPlayingPromise = UseCases.MoviesNowPlayingUseCase(movieDbFetcher);
    const upcommingPromise = UseCases.MoviesPopularUseCase(movieDbFetcher);
    const topRatedPromise = UseCases.MoviesTopRatedUseCase(movieDbFetcher);
    const popularPromise = UseCases.MoviesUpcomingUseCase(movieDbFetcher);


    const [
      nowPlayingMovies,
      popularMovies,
      topRatedMovies,
      upcomingMovies
    ] = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcommingPromise
    ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setToptRated(topRatedMovies);
    setUpcomming(upcomingMovies)
    setIsLoading(false);
  }



  return {
    isLoading,
    nowPlaying,
    upcomming,
    toptRated,
    popular,

    // methods

    popularNextPage: async () => {
      popularPage++;
      const popularMovies = await UseCases.MoviesPopularUseCase(movieDbFetcher, {
        page: popularPage
      });
      setPopular( prev => [...prev, ... popularMovies])
    }
  }
}

