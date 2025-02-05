<script setup> 
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const submitForm = () => {
    console.log('Form submitted:', form.value)
}
</script>

<template>
    <div class="contact-page">
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div>
                <label for="message">Message:</label>
                <textarea id="message" v-model="form.message" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.contact-page h1 {
    text-align: center;
}

.contact-page form {
    display: flex;
    flex-direction: column;
}

.contact-page form div {
    margin-bottom: 15px;
}

.contact-page form label {
    margin-bottom: 5px;
    font-weight: bold;
}

.contact-page form input,
.contact-page form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.contact-page form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.contact-page form button:hover {
    background-color: #0056b3;
}
</style>