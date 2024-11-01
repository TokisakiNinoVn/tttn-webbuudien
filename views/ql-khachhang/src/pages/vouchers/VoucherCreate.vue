<template>
    <div>
      <h2>Create New Voucher</h2>
      <form @submit.prevent="createVoucher">
        <div>
          <label for="code">Code:</label>
          <input type="text" v-model="code" required />
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <input type="date" v-model="endDate" required />
        </div>
        <div>
          <label for="usageLimit">Usage Limit:</label>
          <input type="number" v-model="usageLimit" required />
        </div>
        <button type="submit">Create Voucher</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { addVoucher } from '@/services/modules/voucher.api';
  
  export default {
    emits: ['voucherCreated'],
    setup(props, { emit }) {
      const code = ref('');
      const endDate = ref('');
      const usageLimit = ref(0);
  
      const createVoucher = async () => {
        try {
          await addVoucher({ code: code.value, endDate: endDate.value, usageLimit: usageLimit.value });
          emit('voucherCreated'); // Emit event to notify parent component
          code.value = '';
          endDate.value = '';
          usageLimit.value = 0;
        } catch (error) {
          console.error('Error creating voucher:', error);
        }
      };
  
      return {
        code,
        endDate,
        usageLimit,
        createVoucher,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  