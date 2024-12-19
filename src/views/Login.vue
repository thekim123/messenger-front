<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '../services/api'; // Axios 설정 파일
import { useAuthStore } from '../stores/auth'; // Pinia 상태 관리

export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const authStore = useAuthStore();

    const handleLogin = async () => {
      try {
        const response = await api.post('/auth/login', {
          username: username.value,
          password: password.value,
        });

        // 액세스 토큰과 리프레시 토큰 저장
        const { access, refresh } = response?.data.body || {};
        authStore.setTokens(access, refresh);

        alert('Login successful!');
      } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Login failed!';
      }
    };

    return { username, password, errorMessage, handleLogin };
  },
});
</script>
