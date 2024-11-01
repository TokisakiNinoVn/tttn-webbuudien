// auth.api.js
import instance from '@/services/axiosConfig';

// Get all users
const getAll = async () => instance.get('/api/private/customers');

// Add a new user
const add = async ({ username, email, password }) =>
  instance.post('/api/private/customers/add', { username, email, password });

// Get a specific user by ID
const getById = async (id) => instance.get(`/api/private/customers/${id}`);

// Update a user by ID
const update = async (id, { name, phone, address, gender }) =>
  instance.put(`/api/private/customers/${id}`, { name, phone, address, gender });

// Delete a user by ID
const remove = async (id) => instance.delete(`/api/private/customers/${id}`);

// Search users by criteria (name, phone, address, ID)
const search = async (query) =>
  instance.post('/api/private/customers/search', { query });

// Filter users by role
const filterByRole = async (role) =>
  instance.post('/api/private/customers/filter', { role });

export {
  getAll,
  add,
  getById,
  update,
  remove,
  search,
  filterByRole
};
