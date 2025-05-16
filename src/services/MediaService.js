import { apiClient } from './AxiosConfig';

export const uploadMedia = (formData) =>
  apiClient.post('/resource-service/api/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });