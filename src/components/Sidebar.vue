<template>
  <div class="sidebar">
    <div class="sidebar-item" @click="$emit('select-tab', 'friends')">
      <i class="fas fa-user-friends"></i> 동료 목록
    </div>
    <div class="sidebar-item" @click="$emit('select-tab', 'chatRooms')">
      <i class="fas fa-comment-dots"></i> 채팅방
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #ddd;
}

.sidebar-item {
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar-item:hover {
  background-color: #e9ecef;
}

.sidebar-item i {
  margin-right: 10px;
}
</style>
