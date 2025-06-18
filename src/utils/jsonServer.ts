import axios from 'axios';

export const jsonApi = axios.create({
  baseURL:
    process.env.JSON_SERVER_URL ||
    'http://localhost:3001' ||
    'https://my-json-server.typicode.com/happyCity805/be-grand-hotel',
});
