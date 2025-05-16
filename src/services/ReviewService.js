import { apiClient } from './AxiosConfig';

export const createReview = (data) => apiClient.post('/resource-service/api/reviews/add', data);
export const getReviews = () => apiClient.get('/resource-service/api/reviews');
export const addComment = (reviewId, comment) =>
  apiClient.post(`/resource-service/api/reviews/${reviewId}/comments`, { content: comment });