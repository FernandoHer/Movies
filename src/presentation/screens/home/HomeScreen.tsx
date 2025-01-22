import React from 'react'
import { Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, nowPlaying, popular, toptRated, upcomming, popularNextPage } = useMovies();

  if (isLoading) {
    return (
      <Text>Cargando</Text>
    )
  }
  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, paddingBottom: 30 }}>

        {/* principal*/}
        <PosterCarousel
          movies={nowPlaying}
        />

        {/* populares*/}
        <HorizontalCarousel
          movies={popular}
          title='Populares'
          loadNextPage={popularNextPage}
        />

        {/*Mejor calificadas*/}
        <HorizontalCarousel
          movies={toptRated}
          title='Top Rated' />

        {/*uncomming*/}
        <HorizontalCarousel
          movies={upcomming}
          title='Próximamente' />
      </View>
    </ScrollView>

  )
}

