<template>
  <div class="content-section">
    <h2>친구 목록</h2>
    <div class="actions">
      <button @click="showAddFriendModal = true" class="add-friend-button">+</button>
      <button @click="showPendingListModal = true" class="pending-list-button">대기 목록</button>
    </div>
    <FriendModal
      v-if="showAddFriendModal"
      @close="showAddFriendModal = false"
      @friend-added="fetchFriends"
    />
    <PendingListModal
      v-if="showPendingListModal"
      @close="showPendingListModal = false"
    />
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="friend in friends" :key="friend.id">{{ friend.name }}</li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api.ts";
import FriendRequestModal from "@/components/FriendRequestModal.vue";
import PendingListModal from "@/components/PendingListModal.vue";

export default {
  name: "FriendsList",
  components: { FriendModal: FriendRequestModal, PendingListModal },
  data() {
    return {
      friends: [],
      loading: true,
      error: null,
      showAddFriendModal: false, // 친구 추가 모달 표시 여부
      showPendingListModal: false, // 대기 목록 모달 표시 여부
    };
  },
  methods: {
    async fetchFriends() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/api/friend/list/all");
        this.friends = response.data;
      } catch (err) {
        this.error = "친구 목록을 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchFriends();
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}

.add-friend-button,
.pending-list-button {
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-friend-button {
  background-color: #007bff;
  color: white;
}

.pending-list-button {
  background-color: #28a745;
  color: white;
}

.add-friend-button:hover {
  background-color: #0056b3;
}

.pending-list-button:hover {
  background-color: #218838;
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
