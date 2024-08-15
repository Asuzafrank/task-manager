<script setup>
import {defineProps, computed } from 'vue';

import taskview from './taskview.vue';




const props = defineProps({
    limit:{
        type:Number,
        default:3
    },
    tasks:{
        type:Array,
        required:true
    }
})

const hasTask = computed(() => {
    return props.tasks.length > 0
})

// const getUserId = () => {
//    const userJson =  localStorage.getItem('user')
//     const user = JSON.parse(userJson)
//     return user.id
// }
// const userId = getUserId()
// onMounted(async() => {
//     let response = await axios.get(`http://localhost:5000/tasks?userId=${userId}`)
//     props.tasks = response.data
    
// })
</script>
<template>
    <div class="container mx-auto p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <taskview v-for="task in props.tasks" :key="task.id" :task="task"/>
    </div>
    </div>
    <section class="m-auto max-w-lg my-10 px-6">
        <router-link v-if="hasTask" to="/all-tasks" class="bg-black text-white rounded-xl py-4 px-6  block text-center">
        View All Tasks
        </router-link>
        <router-link v-else to="/add-task" class="bg-black text-white rounded-xl py-4 px-6  block text-center">
        Create New Task
        </router-link>
    </section>


  
    
</template>