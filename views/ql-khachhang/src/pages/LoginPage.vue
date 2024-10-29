<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Tên người dùng:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Đăng Nhập
        </button>
        <div v-if="errorMessage" class="mt-4 text-red-600 text-sm">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/modules/auth.api';

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error message

  try {
    const response = await login({ username: username.value, email: email.value, password: password.value });
    const { data } = response.data;

    // Lưu token vào localStorage nếu cần thiết
    localStorage.setItem('token', data.token); // Nếu API trả về token

    // Chuyển hướng đến trang cá nhân hoặc trang chính
    router.push('/home'); // Cập nhật đường dẫn đến trang cá nhân

  } catch (error) {
    // Xử lý lỗi
    errorMessage.value = error.response?.data?.message || 'Đăng nhập thất bại';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
}
input:focus {
  outline: none;
}
</style>
