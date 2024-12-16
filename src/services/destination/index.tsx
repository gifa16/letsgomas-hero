/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/lib/axios/instance';

export const destinationServices = {
  getAllDestinations: () => instance.get('/api/destination'),
  updateDestination: (id: string, data: any, token: string) =>
    instance.put(
      `/api/destination/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

  deleteDestination: (id: string, token: string) =>
    instance.delete(`/api/destination/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  addDestination: (data: any, token: string) =>
    instance.post('/api/destination', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default destinationServices;