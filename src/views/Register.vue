<template>
    <div>
      <h1>Register</h1>
      <b-form @submit.prevent="register">
        <b-form-group label="Name:" label-for="name">
          <b-form-input id="name" v-model="name" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="email">
          <b-form-input id="email" v-model="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        role: '',
      };
    },
    methods: {
      ...mapActions(['register']),
      async register() {
        try {
          await this.register({ name: this.name, email: this.email, password: this.password });
          this.$router.push('/appointments');
        } catch (error) {
          console.error('Error registering:', error);
        }
      },
    },
  };
  </script>