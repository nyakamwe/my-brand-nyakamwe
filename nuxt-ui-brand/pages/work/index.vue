<template>
    <!-- Experience -->
    <div>
        <h3 class="text-2xl font-bold pb-2">Work</h3>
        <div class="grid gap-5">
            <div class="bg-white rounded-lg shadow-lg flex justify-between">
                <div class="m-10 max-w-xs md:max-w-2xl">
                    <h2 class="mt-3 text-lg font-semibold">Full-Stack Development</h2>
                    <p class="text-2xl font-bold mt-5">Fab Store shopping app</p>
                    <p class="mt-5 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. In rerum officiis velit, illo ut iure quos eveniet molestiae neque soluta doloribus ducimus possimus hic esse doloremque tenetur dignissimos sit magni! Dicta similique provident nisi asperiores. Magnam, nostrum? Error, reprehenderit eum, facilis numquam nisi enim, laboriosam quod deleniti esse laudantium maiores nam fuga fugiat temporibus iure a. Repellendus iusto repellat maiores sed dolore unde consequuntur iste corporis dignissimos quisquam, molestiae aut officia sapiente ipsam totam nisi voluptatem minus! Eius, amet facilis.</p>
                    <NuxtLink :to="``" class="inline-block mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200">
                        View Details
                    </NuxtLink>
                </div>
                <div class="m-10">
                    <img class="w-full h-auto rounded-lg" src="https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
                </div>
            </div>
    
            <div class="bg-white rounded-lg shadow-lg flex justify-between">
                <div class="m-10 max-w-xs md:max-w-2xl">
                    <h2 class="mt-3 text-lg font-semibold">Full-Stack Development</h2>
                    <p class="text-2xl font-bold mt-5">Christians Information Management System - ADEPR Batsinda </p>
                    <p class="mt-5 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. In rerum officiis velit, illo ut iure quos eveniet molestiae neque soluta doloribus ducimus possimus hic esse doloremque tenetur dignissimos sit magni! Dicta similique provident nisi asperiores. Magnam, nostrum? Error, reprehenderit eum, facilis numquam nisi enim, laboriosam quod deleniti esse laudantium maiores nam fuga fugiat temporibus iure a. Repellendus iusto repellat maiores sed dolore unde consequuntur iste corporis dignissimos quisquam, molestiae aut officia sapiente ipsam totam nisi voluptatem minus! Eius, amet facilis.</p>
                    <NuxtLink :to="``" class="inline-block mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200">
                        View Details
                    </NuxtLink>
                </div>
                <div class="m-10">
                    <img class="w-full h-auto rounded-lg" src="https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
                </div>
            </div>
    
            <div class="bg-white rounded-lg shadow-lg flex justify-between">
                <div class="m-10 max-w-xs md:max-w-2xl">
                    <h2 class="mt-3 text-lg font-semibold">Full-Stack Development</h2>
                    <p class="text-2xl font-bold mt-5">Christians Information Management System - ADEPR Batsinda </p>
                    <p class="mt-5 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. In rerum officiis velit, illo ut iure quos eveniet molestiae neque soluta doloribus ducimus possimus hic esse doloremque tenetur dignissimos sit magni! Dicta similique provident nisi asperiores. Magnam, nostrum? Error, reprehenderit eum, facilis numquam nisi enim, laboriosam quod deleniti esse laudantium maiores nam fuga fugiat temporibus iure a. Repellendus iusto repellat maiores sed dolore unde consequuntur iste corporis dignissimos quisquam, molestiae aut officia sapiente ipsam totam nisi voluptatem minus! Eius, amet facilis.</p>
                    <NuxtLink :to="`/experience/fab-store`" class="inline-block mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition duration-200">
                        View Details
                    </NuxtLink>
                </div>
                <div class="m-10">
                    <img class="w-full h-auto rounded-lg" src="https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

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