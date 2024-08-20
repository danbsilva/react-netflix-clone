import axios, { AxiosResponse } from 'axios';
import { MovieType } from '../types/Movie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
  }
});

export const fetchMovies = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<{ results: MovieType[] }> = await api.get(`/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMoviesPopular = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<{ results: MovieType[] }> = await api.get(`/movie/popular?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export const fetchMovieById = async (movieId: number): Promise<MovieType> => {
  try {
    const response: AxiosResponse<MovieType> = await api.get(`/movie/${movieId}?language=pt-BR`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};


export const fetchSeries = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<{ results: MovieType[] }> = await api.get(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
}

export const fetchSerieById = async (serieId: number): Promise<MovieType> => {
  try {
    const response: AxiosResponse<MovieType> = await api.get(`/tv/${serieId}?language=pt-BR`);
    return response.data;
  } catch (error) {
    console.error('Error fetching serie by ID:', error);
    throw error;
  }
}
