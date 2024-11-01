<template>
    <div>
      <h1>Quản lý Voucher</h1>
      
      <!-- Search Bar -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm theo ID hoặc Mã"
        @input="searchVouchers"
      />
      
      <!-- Filter Buttons -->
      <div>
        <button @click="filterExpiredVouchers">Hiển thị đã hết hạn</button>
        <button @click="filterActiveVouchers">Hiển thị đang hoạt động</button>
        <button @click="filterUsableVouchers">Hiển thị còn lượt sử dụng</button>
        <button @click="filterUsedOutVouchers">Hiển thị đã hết lượt sử dụng</button>
      </div>
  
      <!-- Create New Voucher -->
      <VoucherCreate @voucherCreated="fetchVouchers" />
  
      <!-- Vouchers Table -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã Voucher</th>
            <th>Loại giảm giá</th>
            <th>Số tiền giảm</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Giới hạn sử dụng</th>
            <th>Số lượt đã sử dụng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="voucher in vouchers" :key="voucher.id">
            <td>{{ voucher.id }}</td>
            <td>{{ voucher.code }}</td>
            <td> 
                <span v-if="voucher.discount_type === 'percentage'">Phần trăm</span>
                <span v-else>Tiền</span>
            </td>
            <td>{{ voucher.discount_type === 'percentage' ? voucher.discount_amount + '%' : voucher.discount_amount }}</td>
            <td>{{ formatDate(voucher.start_date) }}</td>
            <td>{{ formatDate(voucher.end_date) }}</td>
            <td>{{ voucher.usage_limit }}</td>
            <td>{{ voucher.used_count }}</td>
            <td>
                <span v-if="voucher.start_date === voucher.end_date">Đã hết hạn</span>
                <span v-else-if="voucher.usage_limit === voucher.used_count">Đã hết lượt dùng</span>
                <span v-else>{{ voucher.is_active === 1 ? 'Đang hoạt động' : 'Đã hết hạn' }}</span>
            </td>
            <td>
              <VoucherUpdate
                :voucher="voucher"
                @voucherUpdated="fetchVouchers"
              />
              <button @click="deleteVoucher(voucher.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {
    getAllVouchers,
    searchVoucher,
    filterExpiredVouchers as fetchExpiredVouchers,
    filterActiveVouchers as fetchActiveVouchers,
    filterUsableVouchers as fetchUsableVouchers,
    filterUsedOutVouchers as fetchUsedOutVouchers,
    deleteVoucher as deleteVoucherAPI,
  } from '@/services/modules/voucher.api';
  import VoucherCreate from './VoucherCreate.vue';
  import VoucherUpdate from './VoucherUpdate.vue';
  
  // Reactive variables
  const vouchers = ref([]);
  const searchQuery = ref('');
  
  // Fetch all vouchers
  const fetchVouchers = async () => {
    try {
      const response = await getAllVouchers();
      vouchers.value = response.data;
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };
  
  // Search vouchers by query
  const searchVouchers = async () => {
    if (searchQuery.value) {
      const response = await searchVoucher(searchQuery.value);
      vouchers.value = response.data;
    } else {
      fetchVouchers(); // Fetch all vouchers if search query is empty
    }
  };
  
  // Filter functions
  const filterExpiredVouchers = async () => {
    const response = await fetchExpiredVouchers();
    vouchers.value = response.data;
  };
  
  const filterActiveVouchers = async () => {
    const response = await fetchActiveVouchers();
    vouchers.value = response.data;
  };
  
  const filterUsableVouchers = async () => {
    const response = await fetchUsableVouchers();
    vouchers.value = response.data;
  };
  
  const filterUsedOutVouchers = async () => {
    const response = await fetchUsedOutVouchers();
    vouchers.value = response.data;
  };
  
  // Delete voucher
  const deleteVoucher = async (id) => {
    try {
      await deleteVoucherAPI(id);
      fetchVouchers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
  // Lifecycle hook
  onMounted(fetchVouchers);
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  