<template>
  <div class="container">
    <ul id="messages" class="chat-list">
      <li
        v-for="(message, index) in messages"
        :key="index"
        :class="`message-container ${message.isMine ? 'mine' : 'yours'}`"
      >
        <span class="nickname">{{ message.username }}</span><br />
        <span class="message">{{ message.content }}</span>
      </li>
    </ul>
    <div class="input-container">
      <input
        type="text"
        id="message"
        v-model="messageContent"
        placeholder="Type a message"
        class="input"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import SockJS from "sockjs-client";
import { Client as StompClient } from "@stomp/stompjs";

export default {
  name: "ChatRoom",
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: "", // 사용자 이름
      messageContent: "", // 입력된 메시지
      messages: [], // 수신된 메시지
      stompClient: null, // Stomp 클라이언트
    };
  },
  methods: {
    connect() {
      if (!this.username.trim()) {
        alert("Please enter a username");
        return;
      }

      const socket = new SockJS("/ws");
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, () => {
        console.log("Connected to room:", this.roomId);

        // 특정 채팅방의 메시지 구독
        this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          this.addMessage(parsedMessage.content, parsedMessage.sender);
        });

        // 사용자 추가 메시지 전송
        this.stompClient.send(
          "/app/chat.addUser",
          {},
          JSON.stringify({ sender: this.username, type: "JOIN", roomId: this.roomId })
        );
      });
    },
    sendMessage() {
      if (!this.messageContent.trim() || !this.stompClient) {
        return;
      }

      const message = {
        sender: this.username,
        content: this.messageContent,
        type: "CHAT",
        roomId: this.roomId, // 메시지에 방 ID 추가
      };

      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
      this.addMessage(this.messageContent, this.username, true);
      this.messageContent = "";
    },
    addMessage(content, username, isMine = false) {
      this.messages.push({ content, username, isMine });

      // 스크롤 자동 내리기
      this.$nextTick(() => {
        const messagesList = this.$el.querySelector("#messages");
        messagesList.scrollTop = messagesList.scrollHeight;
      });
    },
  },
};
</script>
