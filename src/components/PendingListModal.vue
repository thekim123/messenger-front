<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>대기 목록</h3>
      <div v-if="loading">로딩 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <li v-for="request in pendingList" :key="request.id">
          {{ request.user.username }}
          <button @click="acceptFriend(request.user.username)">수락</button>
          <button @click="rejectFriend(request.user.username)">거절</button>
        </li>
      </ul>
      <div class="modal-actions">
        <button @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.ts";

export default {
  name: "PendingListModal",
  data() {
    return {
      pendingList: [], // 대기 목록 데이터
      loading: true, // 로딩 상태
      error: null, // 에러 메시지
    };
  },
  async mounted() {
    await this.fetchPendingList();
  },
  methods: {
    async fetchPendingList() {
      try {
        const response = await api.get("/api/friend/list/pending");
        console.log(response);
        this.pendingList = response.data; // 대기 목록 데이터 설정
      } catch (err) {
        this.error = "대기 목록을 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async acceptFriend(friendUsername) {
      try {
        await api.put(`/api/friend/accept/${friendUsername}`);
      } catch (err) {
        this.error = "대기 목록을 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.loading = false;
        await this.fetchPendingList();
      }
    },

    async rejectFriend(friendUsername) {
      try {
        await api.put(`/api/friend/reject/${friendUsername}`);
      } catch (err) {
        this.error = "대기 목록을 불러오는 데 실패했습니다.";
        console.error(err);
      } finally {
        this.loading = false;
        await this.fetchPendingList();
      }
    },
  },
};


async function denyFriend() {

}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal h3 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:hover {
  background-color: #0056b3;
}
</style>
