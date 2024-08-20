import { useEffect, useState } from 'react'

// Styles
import './App.css'

// Services
// import createAPI from './services/db'
import { fetchMovies, fetchMovieById, fetchMoviesPopular, fetchSeries, fetchSerieById } from './services/apiService'
import { MovieType } from './types/Movie'

// Components
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie'
import MovieRow from './components/MovieRow'
import Footer from './components/Footer'


function App() {
  
  const [listMoviesPopular, setListMoviesPopular] = useState<MovieType[]>([]); 
  const [listMovies, setListMovies] = useState<MovieType[]>([]);
  const [listSeries, setListSeries] = useState<MovieType[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<MovieType | null>(null)
  const [blackHeader, setBlackHeader] = useState<boolean>(false)
  const [transition, setTransition] = useState<boolean>(false);

  useEffect(() => {
    async function handleGetMoviePopularInfo() {
      if (listMovies.length === 0) return
      
      setTransition(true)
      try {
        const { id } = listMoviesPopular[Math.floor(Math.random() * listMoviesPopular.length)]
        const moviePopularId: number = id as number;
        const moviePopularInfo = await fetchMovieById(moviePopularId)
        setTimeout(() => {
          setFeaturedMovie(moviePopularInfo)
          setTransition(false);
        }, 800)
      } catch (error) {
        console.error('Error fetching movie info:', error)
      }
    }

    handleGetMoviePopularInfo();

    const interval = setInterval(() => {
      handleGetMoviePopularInfo()
    }, 5000);

    return () => clearInterval(interval)
    
  }, [listMovies]);
  

  useEffect(() => {
    async function handleGetMovies () {
      try {
        const moviesPopular = await fetchMoviesPopular()
        const movies = await fetchMovies()
        const series = await fetchSeries()

        setListMoviesPopular(moviesPopular)
        setListMovies(movies)
        setListSeries(series)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    handleGetMovies()
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header black={blackHeader} />
      {featuredMovie && <FeaturedMovie movie={featuredMovie} transition={transition} />}
      <section className="movieList">
        <MovieRow title="Filmes" items={listMovies} />
        <MovieRow title="Séries" items={listSeries} />
      </section>
      <Footer />
    </>
  )
}

export default App