const API_KEY = "47f339cbef27b24bafd88d69eb5de025";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Failed to fetch popular movies:", err);
    return [];
  }
};

// Search movies by title
export const searchMovie = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
    );
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Failed to search movies:", err);
    return [];
  }
};
