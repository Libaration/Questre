export const fetchSearchResults = async (query) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&safeSearch=none&key=${process.env.YTKEY}`;
  const response = await fetch(URL);
  console.log(response);
};
