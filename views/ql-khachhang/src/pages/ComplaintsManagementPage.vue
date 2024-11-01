<template>
    <div class="complaints-management">
      <h2>Quản Lý Khiếu Nại</h2>
      <div v-for="complaint in complaints" :key="complaint.id" class="complaint-item">
        <h3>{{ complaint.title }}</h3>
        <p>{{ complaint.content }}</p>
        <textarea v-model="response" placeholder="Nhập phản hồi"></textarea>
        <button @click="sendResponse(complaint.id)">Gửi Phản Hồi</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const complaints = ref([
    { id: 1, title: "Khiếu nại về giao hàng chậm", content: "Đơn hàng của tôi đã chậm hơn 2 ngày..." },
    { id: 2, title: "Sai sót trong quá trình giao hàng", content: "Đơn hàng của tôi bị giao sai địa chỉ..." },
  ]);
  const response = ref("");
  
  function sendResponse(id) {
    // Gửi phản hồi cho khách hàng (giả lập)
    alert(`Đã gửi phản hồi cho khiếu nại ${id}: ${response.value}`);
    response.value = "";  // Xóa nội dung sau khi gửi
  }
  </script>
  
  <style scoped>
  .complaint-item {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  textarea {
    width: 100%;
    margin: 5px 0;
  }
  button {
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
  </style>
  