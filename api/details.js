// https://api.themoviedb.org/3/movie/{movie_id}
module.exports = async function handler(req, res) {
  const { movieId } = req.query;

    if (!movieId) {
    return res.status(400).json({ error: "Missing movieId parameter" });
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch details" });
  }

  const data = await response.json();
  
  res.json(data);
};