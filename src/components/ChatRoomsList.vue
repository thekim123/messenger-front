<template>
  <div class="content-section">
    <h2>채팅방 목록</h2>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">{{ room.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatRoomsList",
  props: {
    chatRooms: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.content-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #e9ecef;
}
</style>
