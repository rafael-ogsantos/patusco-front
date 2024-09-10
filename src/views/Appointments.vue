<template>
  <Header />
  <div>
    <h1>Appointments</h1>
    <form @submit.prevent="fetchAppointments">
      <b-form-group label="Date:" label-for="date">
        <b-form-input id="date" v-model="date" type="date"></b-form-input>
      </b-form-group>
      <b-form-group label="Animal Type:" label-for="animalType">
        <b-form-input id="animalType" v-model="animalType" type="text"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Filter</b-button>
    </form>
    <b-table :items="appointments" :fields="fields" responsive="sm">
      <template #cell(actions)="data">
        <b-button @click="openDoctorModal(data.item)" variant="success">Agendar com um médico</b-button>
      </template>
    </b-table>
    <div v-if="!loading && appointments.length === 0">
      <p>No appointments found.</p>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <!-- Modal para selecionar doutor -->
    <b-modal v-model="showDoctorModal" title="Select Doctor" @ok="assignDoctor">
      <b-form-group label="Select a Doctor:" label-for="doctor">
        <select v-model="selectedDoctorId" id="doctor" class="form-control">
          <option value="">Select a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
        </select>
      </b-form-group>
    </b-modal>

    <b-toast id="success-toast" variant="success" solid :visible="showSuccessToast" @hidden="showSuccessToast = false">
      Consulta agendada com sucesso!
    </b-toast>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import api from '@/services/api';

export default {
  components: {
    Header,
  },
  name: 'UserAppointments',
  data() {
    return {
      date: '',
      animalType: '',
      appointments: [],
      loading: false,
      fields: [
        { key: 'person_name', label: 'Person Name' },
        { key: 'email', label: 'Email' },
        { key: 'animal_name', label: 'Animal Name' },
        { key: 'animal_type', label: 'Animal Type' },
        { key: 'animal_age', label: 'Animal Age' },
        { key: 'symptoms', label: 'Symptoms' },
        { key: 'appointment_date', label: 'Appointment Date' },
        { key: 'period', label: 'Period' },
        { key: 'actions', label: 'Actions' },
      ],
      showDoctorModal: false,
      selectedAppointment: null,
      selectedDoctorId: null,
      doctors: [],
      showSuccessToast: false,
    };
  },
  methods: {
    async fetchAppointments() {
      this.loading = true;
      try {
        const params = {};
        if (this.date) params.date = this.date;
        if (this.animalType) params.animal_type = this.animalType;

        const response = await api.get('/appointments', { params });
        this.appointments = response.data;
        console.log('Appointments:', this.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        this.loading = false;
      }
    },
    async openDoctorModal(appointment) {
      this.selectedAppointment = appointment;
      this.showDoctorModal = true;
      await this.fetchDoctors();
    },
    async fetchDoctors() {
      try {
        const response = await api.get('/doctors');
        this.doctors = response.data;

        console.log('Doctors:', this.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    },
    async assignDoctor() {
      if (!this.selectedDoctorId || !this.selectedAppointment) return;

      try {
        const response = await api.post(`/appointments/${this.selectedAppointment.id}/assign`, {
          doctor_id: this.selectedDoctorId,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Appointment assigned:', response.data);
        this.showDoctorModal = false;
        this.selectedDoctorId = null;
        this.selectedAppointment = null;
        this.fetchAppointments();
        this.showSuccessToast = true; 
      } catch (error) {
        console.error('Error assigning doctor:', error);
      }
    },
  },
  async mounted() {
    await this.fetchAppointments();
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>