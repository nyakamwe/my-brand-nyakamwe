<template>
    <div class="m-7 p-4 max-w-sm mx-auto flex flex-col text-center card border rounded">
        <p class="error-msg">Error:</p> 
        <p class="error-msg">{{ error.message }}</p> 
        <NuxtLink class="btn hover:bg-gray-100" to="/">Back to Home</NuxtLink>
    </div>
</template>
<script setup>
    defineProps(['error'])
</script>
<style>
    .error-msg{
        color: red,
    }
</style>
