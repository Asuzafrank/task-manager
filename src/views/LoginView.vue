<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification';


const toast = useToast()



const form = reactive({
   
    email:'',
    password:'',
    

})

const login = async() => {


    const loginUser = {
        email:form.email,
        password:form.password,
     
    }
    try{
          let res = await axios.get(`http://localhost:5000/users?email=${form.email}&password=${form.password}`)
          if(res.status == 200 && res.data.length > 0){
            localStorage.setItem('user', JSON.stringify(res.data[0]))
            toast.success('login successfull')
            router.push('/')
          }
        
        
    }catch(error){
        toast.error("login unsuccessful, please check email or password")
        console.log('Error creating new user ', error)
    }

};
onMounted(() => {
    const user = localStorage.getItem('user')
    if(user){
        router.push('/')
    }
})




</script>

<template>
    <section>
        <div class="mx-auto rounded shadow p-6 max-w-md border">
            <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form @submit.prevent="login">
           
            <div class="mb-4">
                <label for="email" class="block font-medium text-sm text-gray-700">Email:</label>
                <input v-model="form.email" type="email" id="email" placeholder="Enter your email" required class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
            </div>
            <div class="mb-4">
                <label for="password" class="block font-medium text-sm text-gray-700">Password:</label>
                <input v-model="form.password" type="password" id="password" required placeholder="Enter your password" class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
            </div>
          

                <button  class="bg-blue-500 text-white py-3 w-full  rounded-md">
                Login
            </button>
            
        </form>
        <p class="mt-4 text-sm">Don't have an account? 
            <router-link to="/register">Register</router-link>
        </p>
        </div>
        
    </section>
</template>