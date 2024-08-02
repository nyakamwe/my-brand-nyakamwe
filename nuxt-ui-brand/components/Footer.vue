<template>
    <footer class="bg-gray-500 py-4 mt-8">
      <div class="social-links">
            <NuxtLink v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer">
                <Icon :name="link.icon?.name"/>
           </NuxtLink>
      </div>
      <p class="text-white text-center mt-4">© 2023 - {{futureYear}}, All rights reserved.</p>
    </footer>
</template>

<script setup>
  const futureYear = new Date().getFullYear()

  const socialLinks = ref([
    { name: 'Twitter', url: 'https://twitter.com/N1Aimable', icon: { name: 'mdi:twitter' } },
    { name: 'GitHub', url: 'https://github.com/nyakamwe', icon: { name: 'mdi:github' }},
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nyakamwe', icon: { name: 'mdi:linkedin' } },
    { name: 'Email', url: 'mailto:nyakamweaimable@gmail.com', icon: { name: 'mdi:gmail' } }
  ])
</script>

<style scoped>
  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem; /* This creates space between the icons */
    margin-top: 2rem;
  }
</style>