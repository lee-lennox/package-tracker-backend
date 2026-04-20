import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

// Package API
export const getAllPackages = () => {
  return api.get('/packages');
};

export const getPackageById = (id) => {
  return api.get(`/packages/${id}`);
};

export const createPackage = (packageData) => {
  return api.post('/packages', packageData);
};

export const updatePackage = (id, packageData) => {
  return api.put(`/packages/${id}`, packageData);
};

export const deletePackage = (id) => {
  return api.delete(`/packages/${id}`);
};

// Tracking Event API
export const getTrackingEvents = (packageId) => {
  return api.get(`/packages/${packageId}/events`);
};

export const createTrackingEvent = (packageId, eventData) => {
  return api.post(`/packages/${packageId}/events`, eventData);
};

// User API
export const getAllUsers = () => {
  return api.get('/users');
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUserRole = (id, roleId) => {
  return api.put(`/users/${id}/role`, { roleId });
};

export default api;

