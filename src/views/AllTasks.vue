<script setup>
import TasksView from '@/components/TasksView.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const tasks = ref([]);
const status = ref('');

const getUserId = () => {
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  return user.id;
};
const userId = getUserId();

const searchTask = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/tasks?userId=${userId}`);
    // If status is empty, include all tasks; otherwise, filter by status
    tasks.value = status.value
      ? res.data.filter(task => task.status === status.value)
      : res.data;
      console.log(tasks.value)
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

onMounted(() => {
  searchTask();
});

// Watch for changes in status and re-fetch tasks accordingly
watch(status, () => {
  searchTask();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-extrabold text-blue-400 text-center py-6">MY TASKS</h1>
    <hr class="h-1 bg-gray-300 mt-3"/>
    <div class="border border-blue-500 p-4 rounded m-4 flex">
      <select v-model="status" name="status" id="status" class="w-64 py-4 border border-gray-300 rounded-md mx-3 p-3">
        <option value="">All</option>
        <option value="in-progress">in-progress</option>
        <option value="not-started">not-started</option>
        <option value="completed">completed</option>
      </select>
    </div>

    <TasksView :tasks="tasks"/>
  </div>
</template>
