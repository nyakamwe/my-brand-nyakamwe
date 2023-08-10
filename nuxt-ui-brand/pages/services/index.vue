<template>
    <!-- Services section -->
    <div class="grid">
        <h3 class="text-2xl font-bold pb-2">Services</h3>
        <div class="grid grid-cols-2 gap-7">
            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="bi:code-slash" class="rounded-full border p-1"  />
                <h2 class="text-lg font-bold">Full-stack web development</h2>
                <p>I can create web applications from start to finish, 
                    including designing the user interface, building the front-end with HTML, CSS, JavaScript 
                    and JavaScript framework like ReactJS, and VueJS, and developing the back-end with 
                    frameworks like Node.js or Django.
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="mdi:api" class="rounded-full border p-1" />
                <!-- TODO: Change it to reflect to Third Party API Integration -->
                <h2 class="text-lg font-bold">API development and integration</h2>
                <p>I can build RESTful APIs using frameworks like Express.js or Dajngo Rest framework, 
                    and integrate Third-Party APIs like payment gateways or social 
                    media platforms into the app.
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="mdi:ab-testing" class="rounded-full border p-1" />
                <h2 class="text-lg font-bold">Testing and quality assurance</h2>
                <p>I am committed to delivering high-quality
                    software that is bug-free and meets the requirements of my clients. 
                    I have experience with testing frameworks like Jest and RSpec, 
                    and I can perform both manual and automated testing.
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="majesticons:device-mobile-line" class="rounded-full border p-1" />
                <h2 class="text-lg font-bold">Mobile app development</h2>
                <p>I specialize in creating native mobile apps for both iOS, Android and 
                    cross-platform apps using React Native.
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="mdi:database" class="rounded-full border p-1" />
                <h2 class="text-lg font-bold">Database design and management</h2>
                <p>I have experience working with relational databases like MySQL and 
                    PostgreSQL, as well as non-relational databases like MongoDB. 
                    I can design and implement database solutions that are scalable, 
                    reliable, and secure.
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="mdi:cloud-outline" class="rounded-full border p-1" />
                <h2 class="text-lg font-bold">Cloud Development</h2>
                <p> I specialize in developing cloud-based applications and solutions that 
                    can be easily accessed from anywhere in the world. 
                    I have experience working with popular cloud platforms
                    like Amazon Web Services (AWS).
                </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-xl hover:text-lg">
                <Icon name="mdi:train-car-container" class="rounded-full border p-1" />
                <h2 class="text-lg font-bold">Containerization </h2>
                <p> I have experience with containerization and orchestration technologies 
                    such as Docker and Kubernetes. I can help you containerize your 
                    application, manage containers at scale, and deploy your application 
                    to production environments with ease.
                </p>
            </div>
        </div>
    </div>
    <Footer />
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
