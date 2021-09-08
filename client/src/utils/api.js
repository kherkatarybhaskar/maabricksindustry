import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
});
// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

export default api;
