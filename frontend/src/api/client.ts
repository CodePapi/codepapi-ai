import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const translateCode = async (code: string, from: string, to: string) => {
  const response = await apiClient.post('/converter/translate', {
    code,
    from,
    to,
  });

  return response.data;
};

export const reviewCode = async (code: string, lang: string) => {
  const response = await apiClient.post('/converter/review', { code, lang });
  return response.data;
};

export const fixBugs = async (code: string, lang: string) => {
  const response = await apiClient.post('/converter/fix', { code, lang });
  return response.data;
};
