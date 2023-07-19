<template>
    <header class="shadow-sm bg-white">
        <nav class=" container mx-auto p-2 flex justify-between items-center">
            <NuxtLink to="/" class="mt-3">NYAKAMWE.</NuxtLink>
            <div class="flex items-center">
                <NuxtLink to="/" exact-active-class="exact-active" class="mt-2 mx-2">Home</NuxtLink>
                <NuxtLink to="/work" exact-active-class="exact-active" class="mt-2 mx-2">Work</NuxtLink>
                <NuxtLink to="/services" exact-active-class="exact-active" class="mt-2 mx-2">Services</NuxtLink>
            </div>
            <img class="w-12 h-12 rounded-full" src="https://avatars.githubusercontent.com/u/53573955?s=400&u=15719f1c24e8edb176d3dba0f98c0c907bd541d1&v=4" alt="profile-image">
        </nav>
    </header>
</template>

<style>
 .exact-active {
  background-color: #595a59;
  padding: 4px;
  border-radius: 4px;
  color: white;
}
</style>
