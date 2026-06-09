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

  const response = await fetch(
    `/api/search?query=${encodeURIComponent(movieTitle)}`,
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching searched movie data: Status ${response.status}`,
    );
  }

  return response.json();
}

/**
 * @param {number} mediaId
 * @param {"movie" | "tv"} mediaType
 */
export async function fetchTrailer(mediaType, mediaId) {
  if (!mediaType) {
    console.warn("fetchTrailer called without a mediaType");
    return;
  }
  if (!mediaId) {
    console.warn("fetchTrailer called without a mediaId");
    return;
  }

  const response = await fetch(
    `/api/trailer?mediaType=${mediaType}&mediaId=${mediaId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching movie trailer data: Status ${response.status}`,
    );
  }

  return response.json();
}

/**
 * Fetches details from TMDB.
 * @param {number} mediaId
 * @param {"movie" | "tv"} mediaType
 */
export async function fetchDetails(mediaType = "movie", mediaId) {
  if (!mediaId) {
    console.warn("fetchDetails called without a mediaId");
    return;
  }

  const response = await fetch(
    `/api/details?mediaType=${mediaType}&mediaId=${mediaId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching movie details data: Status ${response.status}`,
    );
  }

  return response.json();
}
