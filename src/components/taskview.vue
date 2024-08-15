<script setup>
import { defineProps, computed, ref } from 'vue';
const props = defineProps({
    task:{
        type:Object,
        required:true
    }
});

const toggle = () => {
    showFullDescription.value = !showFullDescription.value
}
let showFullDescription = ref(false)


const status = computed(() => {
    return{
        'text-yellow-600': props.task.status === 'in-progress',
        'text-green-600': props.task.status === 'completed',
        'text-red-600': props.task.status === 'not-started'
    }
});

let shortDescription = computed(() => {
    let description = props.task.description
    if(!showFullDescription.value){
        description = description.substring(0, 70) + '...'
    } return description
})
const formattedDate = computed(() => {
    const date = new Date(props.task.dueDate);
    return date.toDateString()
})

</script>
<template>
    
        <div>
            <div class="bg-white shadow-xl rounded-lg p-6">
                
                <h2 class="text-lg font-semibold text-indigo-500">{{ task.title }}</h2>
                <p class="mt-2 text-gray-600">{{ shortDescription }}</p>
                <button @click="toggle" class="text-green-500 hover:text-green-600 mb-5">{{ showFullDescription ? 'less' : 'more' }}</button>
                <div class="my-3 flex flex-col justify-between mb-4 p-2 lg:flex-row">
                  <h3 :class="status">Status: {{ task.status }}</h3>
                  <h5 class="text-slate-600 text-bold"><i class="pi pi-calendar"></i> {{ formattedDate }}</h5>
                  
                </div>
                <router-link :to="'/task/' + task.id" class="bg-green-600 p-3 text-white rounded shadow-lg">read more</router-link>
            </div>

       
    </div>
   
</template>