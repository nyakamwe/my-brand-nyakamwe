<template>
    <div class="developer-profile">
      <h1>Full Stack Developer</h1>
      <p class="intro">{{ intro }}</p>
      <div class="skills-container">
        <div v-for="(skills, category) in skillCategories" :key="category" class="skill-category">
          <h2>{{ category }}</h2>
          <ul>
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
      <p class="outro">{{ outro }}</p>
      
      <Footer />
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const intro = ref("A versatile full stack developer with expertise in both frontend and backend technologies. Skilled in crafting seamless, user-centric web applications from concept to deployment. Proficient in:")

    const skillCategories = ref({
    Frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Vue.js'],
    Backend: ['Node.js', 'Nestjs', 'Python'],
    Databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
    DevOps: ['Docker', 'Kubernetes', 'AWS', 'CI/CD pipelines'],
    'Version Control': ['Git', 'GitHub'],
    'Messaging, Queues and Caching': ['Kafka', 'Bull', 'Redis']
    })

    const outro = ref("Passionate about clean, efficient code and committed to staying current with emerging technologies. Experienced in agile development methodologies and cross-functional team collaboration. Dedicated to delivering robust, scalable solutions that drive business growth and enhance user experience.")
</script>
  
<style scoped>
  .developer-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .intro, .outro {
    text-align: justify;
    margin-bottom: 1.5rem;
  }
  
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  .skill-category {
    flex-basis: calc(50% - 1rem);
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: #3498db;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    background-color: #ecf0f1;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  li:hover {
    background-color: #3498db;
    color: white;
  }
  
  @media (max-width: 768px) {
    .skill-category {
      flex-basis: 100%;
    }
  }
</style>
