<template>
    <div>
      <button @click="editMode = !editMode">{{ editMode ? 'Cancel' : 'Edit' }}</button>
      <div v-if="editMode">
        <h2>Update Voucher</h2>
        <form @submit.prevent="updateVoucher">
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
          <button type="submit">Update Voucher</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
//   import { updateVoucher } from '@/api/voucher.api';
  
  export default {
    props: {
      voucher: Object,
    },
    setup(props) {
      const code = ref(props.voucher.code);
      const endDate = ref(props.voucher.endDate);
      const usageLimit = ref(props.voucher.usageLimit);
      const editMode = ref(false);
  
      const updateVoucher = async () => {
        try {
          await updateVoucher(props.voucher.id, { code: code.value, endDate: endDate.value, usageLimit: usageLimit.value });
          editMode.value = false; // Exit edit mode after update
        } catch (error) {
          console.error('Error updating voucher:', error);
        }
      };
  
      return {
        code,
        endDate,
        usageLimit,
        editMode,
        updateVoucher,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  