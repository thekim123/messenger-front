import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 URL
  withCredentials: true,
});

// 요청 인터셉터: 액세스 토큰 자동 추가
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터: 액세스 토큰 만료 시 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8080/auth/refresh', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;

        // 새 액세스 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        console.error('Refresh token expired or invalid');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }
    }
    return Promise.reject(error);
  }
);

export default api;
