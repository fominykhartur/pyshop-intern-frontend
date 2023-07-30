import axios from 'axios';
import { useQuasar } from 'quasar';

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err.response.data);
    if (err.response.data.message === 'Unauthorized') {
      console.log('jwtjwqetw');
    } else {
      console.log('123');
    }
    throw new Error(err.response.data.message);
  }
);

export async function getRequest(url: string) {
  const result = await axios.get(url, {
    headers: { Authorization: `Bearer ${useQuasar().cookies.get('JWT')}` },
  });

  return result;
}

export async function postRequest(url: string, body: object) {
  const result = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
  });

  return result;
}
