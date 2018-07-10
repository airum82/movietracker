const recentMovies = (nowPlaying) => {
  return nowPlaying.map(movie => {
    return {
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      ratings: movie.vote_average
    }
  })
}

export default recentMovies