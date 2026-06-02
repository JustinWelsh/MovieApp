export async function fetchPopular(type = "movie") {
  const response = await fetch(`/api/popular?type=${type}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

/**
 * Fetches trending content from TMDB.
 * @param {"all" | "movie" | "tv" | "person"} type
 */
export async function fetchTrending(type = "all") {
  const response = await fetch(`/api/trending?type=${type}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: Status ${response.status}`);
  }

  return response.json();
}

export async function searchByMovieTitle(movieTitle) {
     if (!movieTitle) throw new Error("No movie title provided");
 
  const response = await fetch(`/api/search?query=${encodeURIComponent(movieTitle)}`);

  if (!response.ok) {
    throw new Error(`Error fetching searched movie data: Status ${response.status}`);
  }

  return response.json();
}

export async function fetchTrailer(movieID) {
     if (!movieID) throw new Error("No movie ID provided");

  const response = await fetch(`/api/trailer?movieId=${movieID}`);

  if (!response.ok) {
    throw new Error(`Error fetching movie trailer data: Status ${response.status}`);
  }

  return response.json();
}
