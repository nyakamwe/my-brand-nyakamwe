// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
    app:{
        head: {
            title:'NYAKAMWE Aimable - Portfolio',
            link: [
              { rel: 'icon', type: 'image/x-icon', href: 'https://avatars.githubusercontent.com/u/53573955?s=400&u=15719f1c24e8edb176d3dba0f98c0c907bd541d1&v=4' }
            ]
        },
    },
})
