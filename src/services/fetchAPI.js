const API_URL = 'https://economia.awesomeapi.com.br/json/all';

async function fetchAPI() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data);
}

export default fetchAPI;
