import api from './api';

export const applyToJob = (payload) => api.post('/api/applications', payload);

export const getApplications = (adminToken) =>
  api.get('/api/applications', {
    headers: {
      'x-admin-token': adminToken,
    },
  });
