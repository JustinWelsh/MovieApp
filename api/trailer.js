module.exports = async function handler(req, res) {
  const { mediaType, mediaId } = req.query;

  if (!mediaId) {
    return res.status(400).json({ error: "Missing mediaId parameter" });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`,
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch trailer" });
  }

  const data = await response.json();
  const trailer = data.results.find(
    (result) =>
      result.type === "Trailer" &&
      result.name === "Official Trailer" &&
      result.site === "YouTube"
  );

  res.json(trailer || null);
};
