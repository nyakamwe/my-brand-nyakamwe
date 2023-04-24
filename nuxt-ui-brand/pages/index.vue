<template>
    <div class="bg-gray-100">
        <header class="shadow-sm bg-white">
            <nav class=" container mx-auto p-2 flex justify-between">
                <NuxtLink to="/" class="mt-3">NYAKAMWE.</NuxtLink>
                <img class="w-12 h-12 rounded-full" src="https://avatars.githubusercontent.com/u/53573955?s=400&u=15719f1c24e8edb176d3dba0f98c0c907bd541d1&v=4" alt="profile-image">
            </nav>
        </header>
        
        <div class="container mx-auto mt-10 pb-55">
            <div class="grid grid-cols-3 gap-10">
                <div class="bg-white rounded-lg p-6 shadow-xl col-span-2">
                    <span class="text-3xl">Hello, I'm NYAKAMWE Aimable a Full-Stack developer</span> with a bachelor's degree in IT obtained from @UR-CST, currently living in Kigali - Rwanda.
                    <div>
                        Able to do hybrid jobs (Remote or on-Site) and deliver the deliverables in agreed time.
                    </div>
                    <div>
                        <button class="btn">
                          <Icon name="mdi:arrow-right" class="rounded-full border" /> Get in touch
                        </button>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-xl">
                    <div class="flex flex-col items-center">
                        <img class="w-40 h-40 rounded-full border" src="https://avatars.githubusercontent.com/u/53573955?s=400&u=15719f1c24e8edb176d3dba0f98c0c907bd541d1&v=4" alt="profile-image">
                        <div class="grid grid-cols-3 gap-4 mt-5">
                           <NuxtLink to="https://facebook.com" target="_blank">
                                <Icon  name="mdi:facebook" class="ml-4" />
                            </NuxtLink>
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

            <!-- about me section -->
            <div class="container mx-auto mt-10">
                <div class="grid grid-cols-3 gap-10">
                    <div class="container mx-auto bg-white p-6 shadow-xl mt-12 col-span-2 rounded-lg">
                        <h3 class="text-2xl font-bold">About Me</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates in ex odit qui earum vero molestias mollitia quis hic consequatur ut nostrum, dolores harum natus quo corrupti, odio nobis magnam, rem provident. Voluptatum dignissimos perspiciatis quae ducimus quos eveniet, sapiente, amet, aspernatur odit explicabo aliquid. Nisi fugiat qui earum id quod iusto aliquam? Maiores sapiente necessitatibus, doloribus ab suscipit optio. Quaerat at est architecto labore sunt optio obcaecati consequuntur sequi ea consequatur molestiae vitae fuga quas facere incidunt iste, illo molestias! Ipsum, ut architecto illo adipisci eius impedit optio non enim natus rerum dolor doloremque? Sed alias laudantium odio. Iste repudiandae sunt error accusamus dolor quas laborum! Molestias ad amet est a, consequatur veritatis similique id rem quaerat eius.</p>
                        <div>
                            <button class="btn ">
                                <Icon name="mdi:arrow-right" class="rounded-full border" /> More about me
                            </button>
                        </div>
                    </div>
                </div>
            <div> 

            <!-- Countup will go here! -->

            <!-- Services section -->
            <div class="container mx-auto mt-10">
                <div class="grid border p-6">
                    <h3 class="text-2xl font-bold">Services</h3>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="bg-white border rounded-lg shadow-xl">
                            service1
                            <h2 class="text-lg py-6">Software Development</h2>
                            <p>I help you to build software from ideas to implementation</p>
                            <button class="border">
                                Discover More
                            </button>
                            
                        </div>
                        <div class="bg-white border rounded-lg shadow-xl">
                            service2
                            <h2 class="text-lg py-6">Software Development</h2>
                            <p>I help you to build software from ideas to implementation</p>
                            <button class="border">
                                Discover More
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </div>
</template>

<script setup>

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