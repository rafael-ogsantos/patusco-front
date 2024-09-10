<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  created() {
    if (!this.$store || !this.$store.getters) {
      console.error('Store or getters are undefined');
    }
  },
};
</script>