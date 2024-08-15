<script setup>
import HeroSection from '@/components/HeroSection.vue';
import TasksView from '@/components/TasksView.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';


const tasks = ref([])
const taskLimit = 3

const getUserId = () => {
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  return user.id;
};

onMounted(() => {
  fetchTasks();
});

const fetchTasks = async () => {
  try {
    const userId = getUserId(); // Assuming getUserId is defined elsewhere
    const response = await axios.get(`http://localhost:5000/tasks?userId=${userId}`);
    tasks.value = response.data
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

</script>

<template>
 <HeroSection/>
 <TasksView :tasks="tasks.slice(0, taskLimit)" :limit="taskLimit"/>
 
</template>
