<script setup>
import { onMounted,reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';



const toast = useToast()
const getUserId = () => {
    const userJson = localStorage.getItem('user')
    const user = JSON.parse(userJson)
    return user.id
}
const userId = getUserId()
const route = useRoute()
const jobId = route.params.id

const form = reactive({
    title:'',
    description:'',
    dueDate:'',
    priority:'low',
    status:'not-started'
})
const state = reactive({
    task:{}
})

const editTask = async() => {
    const updatedTask = {
        title:form.title,
        description:form.description,
        dueDate:form.dueDate,
        priority:form.priority,
        status:form.status,
        userId:userId
    }
    try{
        let res = await axios.put(`http://localhost:5000/tasks/${jobId}`, updatedTask)
        if(res.status == 200){
            toast.success('Task updated Successfully')
            router.push(`/task/${res.data.id}`)
        }
    }catch(error){

    }
}

onMounted(async() => {
    try{
        const response = await axios.get(`http://localhost:5000/tasks/${jobId}`)
        state.task = response.data;
        form.title = state.task.title
        form.description = state.task.description
        form.dueDate = state.task.dueDate
        form.priority = state.task.priority
        form.status = state.task.status
        

    }catch(error){

    }
})

</script>
<template>
    <section>
        <div class="bg-white rounded shadow-lg mx-auto max-w-md mt-5 p-6">
            <form @submit.prevent="editTask">
                <div class="mb-4">
                    <label for="title" class="block text-sm font-semibold">Title:</label>
                    <input v-model="form.title" type="text" name="title" id="title" placeholder="i.e: my first task" class="w-full py-4 rounded-md mx-3 p-3">
                </div>
                <div class="mb-4">
                    <label for="description" class="block text-sm font-semibold">Description:</label>
                    <textarea v-model="form.description" type="text" name="description" id="description" placeholder="i.e: this is my latest vue app" class="w-full py-4 rounded-md mx-3 p-3"/>
                </div>
                <div class="mb-4">
                    <label for="date" class="block text-sm font-semibold">Due Date:</label>
                    <input v-model="form.dueDate" type="date" name="date" id="date" placeholder="i.e: my first task" class="w-full py-4 rounded-md mx-3 p-3">
                </div>
                <div class="mb-4">
                    <label for="priority" class="block text-sm font-semibold">Priority:</label>
                    <select v-model="form.priority" name="priority" id="priority" class="w-full py-4 rounded-md mx-3 p-3">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="status" class="block text-sm font-semibold">Status:</label>
                    <select v-model="form.status" name="status" id="status" class="w-full py-4 rounded-md mx-3 p-3">
                        <option value="in-progress">in-progress</option>
                        <option value="not-started">not-started</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div class="text-center">
                    <button class="bg-sky-700 text-white ring-2 ring-blue-900 hover:bg-purple-600 rounded-lg py-3 px-20">Update Task</button>
                </div>
                
            </form>
        </div>
    </section>
</template>