<template>
    <div class="appointments-container">
      <Header />
      <h1>Minhas Marcações</h1>
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else>
        <div v-if="appointments.length === 0" class="no-appointments">Nenhuma marcação encontrada.</div>
        <ul v-else class="appointments-list">
          <li v-for="appointment in appointments" :key="appointment.id" class="appointment-item">
            <p><strong>Paciente:</strong> {{ appointment.person_name }}</p>
            <p><strong>Animal:</strong> {{ appointment.animal_name }} ({{ appointment.animal_type }})</p>
            <p><strong>Data:</strong> {{ appointment.appointment_date }}</p>
            <p><strong>Período:</strong> {{ appointment.period }}</p>
            <hr>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import api from '@/services/api';

export default {
  name: 'DoctorAppointments',
  components: {
    Header,
  },
  data() {
    return {
      appointments: [],
      loading: true,
    };
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await api.get('/appointments/doctor', {
          headers: {
            'Authorization': `Bearer ${this.$store.getters.token}`
          }
        });
        this.appointments = response.data;
      } catch (error) {
        console.error('Erro ao buscar marcações:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchAppointments();
  }
};
</script>

<style scoped>
.appointments-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.no-appointments {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.appointments-list {
  list-style-type: none;
  padding: 0;
}

.appointment-item {
  background-color: #fff;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.appointment-item p {
  margin: 5px 0;
}

.appointment-item hr {
  margin-top: 10px;
  border: none;
  border-top: 1px solid #eee;
}
</style>