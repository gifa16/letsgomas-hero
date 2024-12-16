/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/lib/axios/instance';

export const articleServices = {
  getAllArticles: () => instance.get('/api/article'),
  updateArticle: (id: string, data: any, token: string) =>
    instance.put(
      `/api/article/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

  deleteArticle: (id: string, token: string) =>
    instance.delete(`/api/article/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  addArticle: (data: any, token: string) =>
    instance.post('/api/article', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default articleServices;
