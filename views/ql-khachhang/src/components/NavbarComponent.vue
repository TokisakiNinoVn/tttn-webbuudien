<template>
  <div class="main-navbar">
    <nav class="navbar">
      <router-link class="flex item-center flex-col" to="/home">
        <img class="image-logo" src="../assets/logo-4-3.png" alt="Logo">
      </router-link>
      <router-link class="item-navbar" to="/create-order">
        <ion-icon class="icon-item-navbar" name="document-outline"></ion-icon>
        Tạo Đơn Hàng Mới
      </router-link>
      <router-link class="item-navbar" to="/order-tracking">
        <ion-icon class="icon-item-navbar" name="reader-outline"></ion-icon>
        Tra Cứu Đơn Hàng
      </router-link>
      <router-link class="item-navbar" to="/customer-list">
        <ion-icon class="icon-item-navbar" name="person-circle-outline"></ion-icon>
        Quản lý khách hàng
      </router-link>
      <router-link class="item-navbar" to="/transaction-history">
        <ion-icon class="icon-item-navbar" name="sync-outline"></ion-icon>
        Lịch Sử Giao Dịch
      </router-link>
      <router-link class="item-navbar" to="/voucher-management">
        <ion-icon class="icon-item-navbar" name="ticket-outline"></ion-icon>
        Quản Lý Voucher
      </router-link>
      <router-link class="item-navbar" to="/chat">
        <ion-icon class="icon-item-navbar" name="chatbubbles-outline"></ion-icon>
        Chat
      </router-link>
      <router-link class="item-navbar" to="/notification-management">
        <ion-icon class="icon-item-navbar" name="notifications-outline"></ion-icon>
        Quản Lý Thông Báo
      </router-link>
      <router-link class="item-navbar" to="/complaints-management">
        <ion-icon class="icon-item-navbar" name="mail-outline"></ion-icon>
        Quản Lý Khiếu Nại
      </router-link>
      <!-- <button class="hidden-navbar"><ion-icon name="chevron-back-outline"></ion-icon></button> -->
    </nav>
    <!-- <button class="display-navbar"><ion-icon name="chevron-forward-outline"></ion-icon></button> -->
  </div>
</template>
  
<style scoped>
  .main-navbar {
    position: relative;
    width: auto;
    background-color: #f1f1f1;
    height: 100vh;
  }
  .navbar {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: flex-start;
    width: max-content;
  }
  .navbar a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
  }
  .navbar a:hover {
    background-color: #ffffff;
    border-bottom: 1px solid black;
  }

  .image-logo {
    height: 100px;
    border-radius: 20px;
  }

  .item-navbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  ion-icon {
    margin-right: 8px;
  }
</style>
  