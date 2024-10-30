<template>
  <div class="home-page">
    <Navbar />
    <div class="main-content">
      <div class="tools">
        <h1>Danh sách khách hàng</h1>
        <div class="search-input">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Nhập thông tin cần tìm kiếm..."
          />
          <button class="search" @click="searchCustomer">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <select v-model="selectedRole">
          <option value="khách hàng">Khách hàng</option>
          <option value="nhân viên">Nhân viên</option>
        </select>
        <button class="search-and-filter" @click="filterByRoleSelect(selectedRole)">
          <ion-icon name="search-outline"></ion-icon>
          Tìm kiếm
        </button>
      </div>

      <div class="table-customer">
        <v-btn @click="newCustomer">
          <ion-icon name="add-outline"></ion-icon>
          <v-tooltip activator="parent" location="top">Thêm mới khách hàng</v-tooltip>
        </v-btn>
        <vue-good-table
          mode="remote"
          compactMode
          ref="employeeTable"
          :isLoading="isMiniLoading"
          :columns="columns"
          :rows="employees"
          :line-numbers="true"
          :totalRows="totalRecords"
          :sort-options="{ enabled: false }"
        >
          <template #emptystate>
            Không có dữ liệu
          </template>
          <template #table-row="props">
            <div v-if="props.column.field === 'action'">
              <v-btn icon @click="updateCustomer(props.row)">
                <ion-icon name="scan-outline"></ion-icon>
                <v-tooltip activator="parent" location="top">Cập nhật thông tin khách hàng</v-tooltip>
              </v-btn>
              <v-btn @click="viewCustomer(props.row)">
                <ion-icon name="eye-outline"></ion-icon>
                <v-tooltip activator="parent" location="top">Xem thông tin chi tiết</v-tooltip>
              </v-btn>
              <v-btn @click="removeCustomer(props.row.id)">
                <ion-icon name="trash-outline"></ion-icon>
                <v-tooltip activator="parent" location="top">Xóa khách hàng</v-tooltip>
              </v-btn>
            </div>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Navbar from '../../components/NavbarComponent.vue';
import { getAll, search, update, getById, remove, filterByRole } from '@/services/modules/user.api';

const columns = reactive([
  { label: 'Tên đăng nhập', field: 'username' },
  { label: 'Tên', field: 'name' },
  { label: 'Email', field: 'email' },
  { label: 'Điện thoại', field: 'phone' },
  { label: 'Địa chỉ', field: 'address' },
  { label: 'Giới tính', field: 'gender' },
  { label: 'Thao tác', field: 'action' },
]);

const employees = ref([]);
const totalRecords = ref(0);
const isMiniLoading = ref(false);
const searchQuery = ref('');
const selectedRole = ref('khách hàng');

// Gọi API để lấy tất cả khách hàng
const fetchCustomers = async () => {
  isMiniLoading.value = true;
  try {
    const response = await getAll();
    employees.value = response.data; // Giả sử API trả về dữ liệu trực tiếp
    totalRecords.value = employees.value.length; // Cập nhật tổng số bản ghi
  } catch (error) {
    console.error('Error fetching customers:', error);
  } finally {
    isMiniLoading.value = false;
  }
};

// Tìm kiếm khách hàng
const searchCustomer = async () => {
  isMiniLoading.value = true;
  try {
    const response = await search(searchQuery.value);
    employees.value = response.data; // Cập nhật danh sách khách hàng với kết quả tìm kiếm
    totalRecords.value = employees.value.length; // Cập nhật tổng số bản ghi
  } catch (error) {
    console.error('Error searching for customers:', error);
  } finally {
    isMiniLoading.value = false;
  }
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (customer) => {
  const updatedData = {
    // Thay đổi theo thông tin bạn muốn cập nhật
    name: customer.name || 'Tên mới', // Cập nhật tên nếu có, nếu không thì dùng 'Tên mới'
    phone: customer.phone || 'Số điện thoại mới',
    address: customer.address || 'Địa chỉ mới',
  };

  try {
    await update(customer.id, updatedData);
    await fetchCustomers(); // Gọi lại danh sách khách hàng
  } catch (error) {
    console.error('Error updating customer:', error);
  }
};

// Xem thông tin chi tiết khách hàng
const viewCustomer = async (customer) => {
  try {
    const response = await getById(customer.id);
    const customerDetails = response.data;

    // Hiển thị thông tin chi tiết khách hàng (có thể mở modal hoặc điều hướng tới một trang khác)
    console.log(customerDetails);
  } catch (error) {
    console.error('Error fetching customer details:', error);
  }
};

// Xóa khách hàng
const removeCustomer = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
    try {
      await remove(id);
      await fetchCustomers(); // Gọi lại danh sách khách hàng
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  }
};

// Thêm mới khách hàng
const newCustomer = async () => {
  // Thêm logic để mở modal hoặc một trang mới để thêm khách hàng
  console.log("Thêm mới khách hàng");
};

// Lọc theo vai trò
const filterByRoleSelect = async (role) => {
  try {
    const response = await filterByRole(role);
    employees.value = response.data; // Cập nhật danh sách khách hàng với kết quả lọc
    totalRecords.value = employees.value.length; // Cập nhật tổng số bản ghi
  } catch (error) {
    console.error('Error filtering customers:', error);
  }
};

// Gọi API khi component được khởi tạo
fetchCustomers();
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: visible;
}

.main-content {
  font-family: Arial, sans-serif;
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
