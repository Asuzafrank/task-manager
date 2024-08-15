<script setup>
import { onMounted, reactive, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = route.params.id ;
const state = reactive({
    task:{},
    user:{}
});
const status = computed(() => {
    return{
        'text-yellow-600': state.task.status === 'in-progress',
        'text-green-600': state.task.status === 'completed',
        'text-red-600': state.task.status === 'not-started'
    }
});
const priority = computed(() => {
    return{
        'text-yellow-600':state.task.priority === 'medium',
        'text-green-600':state.task.priority === 'low',
        'text-red-600':state.task.priority === 'high'
    }
    
})

const fetchUserInfo = () => {
    const userInfo = localStorage.getItem('user');
    let userdetails = JSON.parse(userInfo)
    let profile = {
        name:userdetails.name,
        email:userdetails.email,
        password:userdetails.password
    }
    state.user = profile
}

const fetchTask = async() => {
    try{
        const res = await axios.get(`http://localhost:5000/tasks/${taskId}`)
        
        state.task= res.data
        
    }catch(error){
        console.log('Error fetching task, ' + error)
    }
}

onMounted(() =>{
    fetchTask(),
    fetchUserInfo()
})

</script>

<template>
    <section>
        <div class="grid sm:grid-cols-1 md:grid-cols-70/30">
            <main>
                <div class="shadow-lg rounded-lg  p-6 bg-white max-w-4xl mx-5 my-5">
  <!-- Title Section -->
                    <h2 class="text-lg font-bold text-gray-700">TITLE:</h2>
                    <p class="text-xl font-semibold text-green-900">{{ state.task.title }}</p>
                    
                    <!-- Description Section -->
                    <h3 class="mt-4 text-lg font-bold text-gray-700">DESCRIPTION:</h3>
                    <p class="mt-2 text-green-600 text-base">{{ state.task.description }}</p>
  
  <!-- Priority Section -->
                <div class="mt-4">
                    <h4 class="text-lg font-bold text-gray-800">Priority:</h4>
                    <p :class="priority">{{ state.task.priority }}</p>
                </div>
  
  <!-- Status Section -->
                <div class="mt-4">
                    <h4 class="text-lg font-bold text-gray-800">Status:</h4>
                    <p :class="status">{{ state.task.status }}</p>
                </div>
  
  <!-- Date Section -->
                <div class="mt-4 flex items-center text-gray-600 mb-4">
                    <i class="pi pi-calendar mr-2"></i>
                    <p class="text-base">{{ state.task.dueDate ? new Date(state.task.dueDate).toLocaleDateString() : 'No date available' }}</p>
                </div>
                <div>
                    <router-link :to="'/edit/'+ taskId" class="bg-yellow-600 px-7 py-4 text-white text-sm mr-3 rounded-md">Edit</router-link>
                    <button @click="deleteTask" class="bg-red-600 p-4 text-white text-sm mr-3 rounded-md">Delete</button>
                </div>
                </div>
               
            </main>
            <aside>
                <div class="bg-white shadow rounded-xl mx-3 my-6 ">
                    <div class="p-10">
                        <h2 class="mb-4 font-serif font-bold text-2xl text-sky-950">Profile info</h2>
                        <h3 class="mb-4  font-semibold text-blue-400 ">Name: {{ state.user.name }}</h3>
                        <h3 class="mb-4  font-semibold text-blue-400 break-words">Email: {{ state.user.email }}</h3>
                        <h3 class="mb-4  font-semibold text-blue-400 ">Your Password: {{ state.user.password }}</h3>
                    </div>
                </div>
            </aside>
        </div>
       
    </section>
</template>