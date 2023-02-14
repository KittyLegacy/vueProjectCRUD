// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    app: {
        head: {
        //   script: [ { children: 'console.log("test3");' }],
            link:[
                { rel:"stylesheet", type:"text/css", href:"https://cdn.jsdelivr.net/npm/daisyui@2.43.2/dist/full.css" },
            { rel:"stylesheet", type:"text/css", href:"https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" },
            ]
        },
    },
})
