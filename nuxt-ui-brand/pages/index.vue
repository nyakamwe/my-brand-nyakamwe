<template>
    <div class="h-[460px]">
        <div class="grid grid-cols-3 gap-10">
        <div class="bg-white rounded-lg p-6 shadow-xl col-span-2">
            <span class="text-3xl">Hello, I'm NYAKAMWE Aimable a Full-Stack developer</span> with a bachelor's degree in IT obtained from @UR-CST, currently living in Kigali - Rwanda.
            <div>
                Able to work hybrid jobs (Remote or on-Site) and deliver the deliverables in agreed time.
            </div>
            <div>
                <button class="btn" @click=sendEmail>
                    <Icon name="mdi:arrow-right" class="rounded-full border" /> Get in touch
                </button>
            </div>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-xl">
            <div class="flex flex-col items-center">
                <img class="w-40 h-40 rounded-full border" src="https://avatars.githubusercontent.com/u/53573955?s=400&u=15719f1c24e8edb176d3dba0f98c0c907bd541d1&v=4" alt="profile-image">
                <div class="grid grid-cols-3 gap-4 mt-5">
                    <!-- <NuxtLink to="https://facebook.com" target="_blank">
                        <Icon  name="mdi:facebook" class="ml-4" />
                    </NuxtLink> -->
                    <NuxtLink to="https://twitter.com/N1Aimable" target="_blank">
                        <Icon  name="mdi:twitter" class="ml-4" />
                    </NuxtLink>
                    <NuxtLink to="https://github.com/nyakamwe" target="_blank">
                        <Icon name="uil:github" class="ml-4"/>
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/in/nyakamwe-aimable/" target="_blank">
                        <Icon name="mdi:linkedin" class="ml-4"/>
                    </NuxtLink>
                    <NuxtLink to="mailto:nyakamweaimable@gmail.com" target="_blank">
                        <Icon name="mdi:gmail" class="ml-4"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>

    </div>
    
</template>

<script setup>
// useHead({
//     title: 'NYAKAMWE Aimable - Portfolio'
// })

const sendEmail = () => {
  const email = 'nyakamweaimable@gmail.com';
  window.open(`mailto:${email}`);
};
</script>

<style>
  .card-container {
    position: relative;
  }
  
  .card-image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  
  .card-text {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    padding: 20px;
    z-index: 2;
  }
</style>
