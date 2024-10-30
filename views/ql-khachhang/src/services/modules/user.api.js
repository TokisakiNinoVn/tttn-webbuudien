// auth.api.js
import instance from '@/services/axiosConfig';

// Get all users
const getAll = async () => instance.get('/api/private/customer');

// Add a new user
const add = async ({ username, email, password }) =>
  instance.post('/api/private/customer/add', { username, email, password });

// Get a specific user by ID
const getById = async (id) => instance.get(`/api/private/customer/${id}`);

// Update a user by ID
const update = async (id, { name, phone, address }) =>
  instance.put(`/api/private/customer/${id}`, { name, phone, address });

// Delete a user by ID
const remove = async (id) => instance.delete(`/api/private/customer/${id}`);

// Search users by criteria (name, phone, address, ID)
const search = async (query) =>
  instance.post('/api/private/customer/search', { query });

// Filter users by role
const filterByRole = async (role) =>
  instance.post('/api/private/customer/filter', { role });

export {
  getAll,
  add,
  getById,
  update,
  remove,
  search,
  filterByRole
};
