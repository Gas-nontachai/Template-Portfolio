<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
    <div>
        <section id="home-page">
            <div class="section home">
                <h1>{{ t('home.welcome') }}</h1>
                <p>{{ t('home.description') }}</p>
            </div>
        </section>
        <section id="about-page">
            <div class="section about">
                <h2>{{ t('about.title') }}</h2>
                <p>{{ t('about.description') }}</p>
            </div>
        </section>
        <section id="contact-page">
            <div class="section contact">
                <h2>{{ t('contact.title') }}</h2>
                <p>{{ t('contact.description') }}</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
h1 {
    color: #2c3e50;
    margin-bottom: 20px;
}

h2 {
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    color: #34495e;
}

.section {
    height: 1000px;
    width: 100%;
    padding-top: 80px;
}

.home {
    background-color: #f1c40f;
}

.about {
    background-color: #e74c3c;
}

.contact {
    background-color: #3498db;
}
</style>
