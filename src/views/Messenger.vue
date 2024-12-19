<template>
  <div class="messenger-container">
    <!-- 헤더 -->
    <header class="header">
      <!--       TODO: 사용자이름 출력하는 기능 만들기-->
      <!--       jwt에서 바로 유저네임 가져오기 가능? - 암호키를 가지고 있어야해서 안될거같은데-->
      <!--       안되면 서버에서 조회....-->
      <h1>메신저</h1>
    </header>

    <div class="content-wrapper">
      <!-- 왼쪽 사이드바 -->
      <Sidebar @select-tab="changeTab"/>
      <!-- 메인 컨텐츠 -->
      <div class="main-content">
        <FriendsList
          @change-tab="changeTab"
          @open-chatroom="handleChangeTab"
          v-if="activeTab === 'friends'"
          :friends="friends"
        />
        <ChatRoomsList
          @change-tab="changeTab"
          v-if="activeTab === 'chatRoomList'"
          :chatRooms="chatRooms"
        />
        <ChatRoom
          @open-chatroom="changeTab"
          v-if="activeTab === 'chatRoom'"
          :chatRooms="chatRooms"
          :room-id="roomId"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import FriendsList from "@/components/FriendsList.vue";
import ChatRoomsList from "@/components/ChatRoomsList.vue";
import ChatRoom from "@/components/ChatRoom.vue"

export default {
  name: "Messenger",
  components: {
    ChatRoom,
    Sidebar,
    FriendsList,
    ChatRoomsList,
  },
  data() {
    return {
      activeTab: "friends", // 현재 활성화된 탭
      friends: [],
      chatRooms: [],
      roomId: "",
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
    handleChangeTab(tabName, roomId) {
      this.activeTab = tabName; // 탭 변경
      if (roomId) {
        this.roomId = roomId; // 현재 활성화된 채팅방 ID 저장
      }
    },
  },
};
</script>

<style scoped>
/* 전체 레이아웃 */
.messenger-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 헤더 스타일 */
.header {
  background-color: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
}

/* 메인 컨텐츠 래퍼 */
.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 메인 컨텐츠 */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
}
</style>
