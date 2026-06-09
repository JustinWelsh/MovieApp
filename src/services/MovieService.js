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
     if (!movieTitle) return;
 
  const response = await fetch(`/api/search?query=${encodeURIComponent(movieTitle)}`);

  if (!response.ok) {
    throw new Error(`Error fetching searched movie data: Status ${response.status}`);
  }

  return response.json();
}

export async function fetchTrailer(movieID) {
     if (!movieID) return;

  const response = await fetch(`/api/trailer?movieId=${movieID}`);

  if (!response.ok) {
    throw new Error(`Error fetching movie trailer data: Status ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches details from TMDB.
 * @param {number} movieID
 * @param {"movie" | "tv"} type
 */
export async function fetchDetails(type = "movie", movieID) {
  if (!movieID) return;

  const response = await fetch(`/api/details?type=${type}&movieId=${movieID}`);

  if (!response.ok) {
    throw new Error(
      `Error fetching movie details data: Status ${response.status}`,
    );
  }

  return response.json();
}
