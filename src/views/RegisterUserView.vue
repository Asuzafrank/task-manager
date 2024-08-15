<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

// Setup toast notifications and router
const toast = useToast();
const router = useRouter();

// Reactive form state
const form = reactive({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
});

// Function to handle form submission
const Register = async () => {
    // Basic validation checks
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirm_password.trim()) {
        toast.error("All fields are required");
        return; // Prevent further execution if any field is empty
    }

    if (form.password !== form.confirm_password) {
        toast.error('Passwords do not match');
        return; // Exit the function if passwords do not match
    }

    // Create new user object
    const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirm_password
    };

    try {
        // Send POST request to the server
        let response = await axios.post('http://localhost:5000/users', newUser);
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
        toast.success('User created successfully');
        router.push('/login'); // Redirect to login page
    } catch (error) {
        toast.error("User not created");
        console.error('Error creating new user: ', error);
    }
};

// Redirect logged-in users away from the register page
onMounted(() => {
    const user = localStorage.getItem('user');
    if (user) {
        router.push('/');
    }
});
</script>

<template>
    <section>
        <div class="mx-auto rounded shadow p-6 max-w-md border">
            <h2 class="text-2xl font-bold mb-4">Register</h2>
            <form @submit.prevent="Register">
                <!-- Name Input -->
                <div class="mb-4">
                    <label for="name" class="block font-medium text-sm text-gray-700">Name:</label>
                    <input v-model="form.name" type="text" id="name" placeholder="Enter your name" required class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
                </div>
                <!-- Email Input -->
                <div class="mb-4">
                    <label for="email" class="block font-medium text-sm text-gray-700">Email:</label>
                    <input v-model="form.email" type="email" id="email" placeholder="Enter your email" required class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block font-medium text-sm text-gray-700">Password:</label>
                    <input v-model="form.password" type="password" id="password" placeholder="Enter your password" required class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
                </div>
                <!-- Confirm Password Input -->
                <div class="mb-4">
                    <label for="confirmPassword" class="block font-medium text-sm text-gray-700">Confirm Password:</label>
                    <input v-model="form.confirm_password" type="password" id="confirmPassword" placeholder="Confirm your password" required class="mt-1 block rounded px-2 py-3 border ring-slate-600 w-full">
                </div>
                <!-- Submit Button -->
                <button :disabled="!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirm_password.trim()" class="bg-blue-500 text-white py-3 w-full rounded-md">
                    Register
                </button>
            </form>
            <p class="mt-4 text-sm">Already have an account? 
                <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
            </p>
        </div>
    </section>
</template>
