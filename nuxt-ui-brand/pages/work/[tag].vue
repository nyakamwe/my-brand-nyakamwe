<template>
    <div class="container mx-auto mt-10">
        <h2 class="font-semibold text-3xl">Store</h2>
        <p class="mt-5 text-gray-700">your boy nel, ft fire man ingoma zirenze twakoze, ese muzemera twapfuye</p>
        <div class="flex mt-10">
            <div class="">
                <h3 class="font-bold mb-2">Client</h3>
                <p>Fabrice</p>
            </div>
            <div class="ml-4">
                <h3 class="font-bold mb-2">Date</h3>
                <p>April 25, 2023</p>
            </div>
            <div class="ml-4">
                <h3 class="font-bold mb-2">technologies</h3>
                <div class="grid grid-cols-2 gap-2">
                    <p>JavaScript</p>
                    <p>JavaScript</p>
                    <p>JavaScript</p>
                    <p>JavaScript</p>
                </div>
            </div>
        </div>

        <div class="">
            <img class="rounded-lg w-full h-100" src="https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
        </div>

        <!-- footer -->
    </div>
    <div class="border rounded-tl rounded-tr mt-10">
            <div class="container mx-auto flex">
                <div>
                    <h2>NYAKAMWE.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquid ut cupiditate aspernatur, quibusdam quam officiis tenetur accusamus eos pariatur ipsum quia rem beatae nostrum, obcaecati, minima inventore praesentium aut.</p>
                </div>
                <div>
                    <h2>Subscribe to my newsletter</h2>
                    <input type="email" placeholder="Enter your Email" />
                    <button >Subscribe</button>
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