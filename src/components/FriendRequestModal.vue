<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>친구 추가</h3>
      <input
        v-model="friendUsername"
        type="text"
        placeholder="친구 아이디를 입력하세요"
      />
      <div class="modal-actions">
        <button @click="addFriend">전송</button>
        <button @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.ts";

export default {
  name: "FriendModal",
  data() {
    return {
      friendUsername: "", // 입력한 친구 아이디
    };
  },
  methods: {
    async addFriend() {
      if (!this.friendUsername.trim()) {
        alert("친구 아이디를 입력하세요.");
        return;
      }
      try {
        await api.post(`/api/friend/request/${this.friendUsername}`);
        alert("친구 추가 요청이 성공적으로 전송되었습니다.");
        this.$emit("friend-added");
        this.$emit("close");
      } catch (err) {
        console.error(err);
        alert("친구 추가 요청에 실패했습니다.");
      }
    },
  },
};
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

.modal input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.modal-actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #007bff;
  color: white;
}

.modal-actions button:first-child:hover {
  background-color: #0056b3;
}

.modal-actions button:last-child {
  background-color: #ccc;
}

.modal-actions button:last-child:hover {
  background-color: #bbb;
}
</style>
