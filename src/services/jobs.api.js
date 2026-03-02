import api from './api';

export const getJobs = (params = {}) => api.get('/api/jobs', { params });

export const getJobById = (id) => api.get(`/api/jobs/${id}`);

export const createJob = (payload, adminToken) =>
  api.post('/api/jobs', payload, {
    headers: {
      'x-admin-token': adminToken,
    },
  });

export const deleteJob = (id, adminToken) =>
  api.delete(`/api/jobs/${id}`, {
    headers: {
      'x-admin-token': adminToken,
    },
  });
