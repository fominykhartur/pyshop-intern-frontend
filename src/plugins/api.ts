import axios from 'axios';
import { Cookies } from 'quasar';
const baseURL = import.meta.env.VITE_HOST;

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const { response, config } = err;

    if (response.status === 403) {
      window.location.href = '/login';
      return Promise.reject(err);
    }

    if (response.status !== 401) {
      return Promise.reject(err);
    }

    console.log('refresh', Cookies.get('id'));
    const id = parseInt(Cookies.get('id'));
    return axios
      .post(
        `${baseURL}/auth/refreshAccessToken`,
        { id: id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('refresh');
        console.log(res);
        console.log(res.data);
        if (!Cookies.has('JWT')) {
          Cookies.set('JWT', res.data.access_token, {
            expires: `${res.data.expiresIn}`,
          });
        }
        config.headers['Authorization'] = `Bearer ${Cookies.get('JWT')}`;
        console.log(config);

        return axiosInstance(config);
      })
      .catch((err) => {
        window.location.href = '#/login';
        return Promise.reject(err);
      });
  }
);

export async function getRequest(url: string) {
  const result = await axios.get(url, {
    headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },
    withCredentials: true,
  });

  return result;
}

export async function postRequest(url: string, body: object) {
  if (!Cookies.has('JWT')) {
    return await axios.post(url, body, { withCredentials: true });
  } else {
    return await axios.post(url, body, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },
    });
  }
}
