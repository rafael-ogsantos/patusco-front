<template>
  <header class="header">
    <div class="user-info">
      <span>Bem-vindo, {{ userName }}</span>
      <b-button @click="logout" variant="danger">Sair</b-button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['userName']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', {
        token: this.$store.getters.token,
      });
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 10px;
  font-weight: bold;
}
</style>