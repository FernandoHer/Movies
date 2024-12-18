import { AxiosAdapter } from "./http/axios.adapter";

export const movieDbFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '5808985f11621cfc95c3e47809149b67',
        language: 'es'
    }
})