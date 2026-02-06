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