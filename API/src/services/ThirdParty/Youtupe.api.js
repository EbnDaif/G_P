const { google } = require("googleapis");

const API_KEY = process.env.Youtube_api_key;

const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
});

async function searchVideos(keyword) {
  try {
    // Make a request to the search.list method
    const response = await youtube.search.list({
      part: "snippet",
      q: keyword,
      maxResults: 10,
    });

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      videolink: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
      videoId: item.id.videoId,
    }));

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube search results:", error.message);
    return [];
  }
}

module.exports = searchVideos;
