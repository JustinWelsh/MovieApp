// https://api.themoviedb.org/3/movie/{movie_id}
//  https://api.themoviedb.org/3/tv/{series_id}
module.exports = async function handler(req, res) {
  const { mediaType = "movie", mediaId } = req.query;

    if (!mediaId) {
      return res.status(400).json({ error: "Missing mediaId parameter" });
    }
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US&api_key=${process.env.TMDB_KEY}`,
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch details" });
  }

  const data = await response.json();
  
  res.json(data);
};