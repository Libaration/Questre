import fetch from 'node-fetch';
export const fetchSearchResults = async (query) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&safeSearch=none&key=${process.env.YTKEY}`;
  const response = await fetch(URL);
  const responseJSON = await response.json();
  return responseJSON.items;
};
