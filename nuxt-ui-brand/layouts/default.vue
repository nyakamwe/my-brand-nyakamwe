<template>
    <div class="min-h-screen bg-gray-100">
        <Header />
        
        <div class="container mx-auto mt-10 pb-55">
           <!-- Inject page content here -->
            <slot />
        </div>

        <!-- about me section -->
        <!-- <div class="container mx-auto mt-10"> -->
            <!-- <div class="grid grid-cols-3 gap-10">
                <div class="container mx-auto bg-white p-6 shadow-xl mt-12 col-span-2 rounded-lg">
                    <h3 class="text-2xl font-bold">About Me</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates in ex odit qui earum vero molestias mollitia quis hic consequatur ut nostrum, dolores harum natus quo corrupti, odio nobis magnam, rem provident. Voluptatum dignissimos perspiciatis quae ducimus quos eveniet, sapiente, amet, aspernatur odit explicabo aliquid. Nisi fugiat qui earum id quod iusto aliquam? Maiores sapiente necessitatibus, doloribus ab suscipit optio. Quaerat at est architecto labore sunt optio obcaecati consequuntur sequi ea consequatur molestiae vitae fuga quas facere incidunt iste, illo molestias! Ipsum, ut architecto illo adipisci eius impedit optio non enim natus rerum dolor doloremque? Sed alias laudantium odio. Iste repudiandae sunt error accusamus dolor quas laborum! Molestias ad amet est a, consequatur veritatis similique id rem quaerat eius.</p>
                    <div>
                        <button class="btn ">
                            <Icon name="mdi:arrow-right" class="rounded-full border" /> More about me
                        </button>
                    </div>
                </div>
            </div> -->
        <!-- <div>  -->

            <!-- Countup will go here! -->
        </div>
        <!-- </div> -->
    <!-- </div> -->
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
