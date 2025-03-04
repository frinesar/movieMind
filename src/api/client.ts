import axios from "axios";

import { setAccessToken } from "../reducers/accessTokenSlice";

import type { AppStore } from "../store/store";

let store: AppStore;
export const injectStore = (_store: AppStore) => {
  store = _store;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().accessToken.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      store.dispatch(
        setAccessToken({
          token: response.data.accessToken,
          status: "fulfilled",
        })
      );
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      store.dispatch(setAccessToken({ token: "", status: "rejected" }));
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/refresh`,
        { withCredentials: true }
      );

      store.dispatch(
        setAccessToken({
          token: response.data.accessToken,
          status: "fulfilled",
        })
      );
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return apiClient(originalRequest);
    } catch (error) {
      store.dispatch(setAccessToken({ token: "", status: "rejected" }));
      return Promise.reject(error);
    }
  }
);

export default apiClient;
