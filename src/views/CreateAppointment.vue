<template>
    <div>
      <h1>Create Appointment</h1>
      <b-form @submit.prevent="createAppointment">
        <b-form-group label="Date:" label-for="date">
          <b-form-input id="date" v-model="date" type="date" required></b-form-input>
        </b-form-group>
        <b-form-group label="Animal Type:" label-for="animalType">
          <b-form-input id="animalType" v-model="animalType" type="text" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'CreateAppointment',
    data() {
      return {
        date: '',
        animalType: '',
      };
    },
    methods: {
      async createAppointment() {
        try {
          await api.post('/appointments', {
            date: this.date,
            animal_type: this.animalType,
          });
          this.$router.push('/appointments');
        } catch (error) {
          console.error('Error creating appointment:', error);
        }
      },
    },
  };
  </script>