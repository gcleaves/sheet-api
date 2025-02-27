// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{
        rel:'stylesheet',
        href:'https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css'
      },{
        rel:'stylesheet',
        href:'https://unpkg.com/@wcj/markdown-to-html/dist/marked.css'
      }]
    }
  },
  experimental: {
    componentIslands: true
  },
  devtools: { enabled: true },
  components: [{
      path: '~/components'
  }],
  devServer: {
    port: 3333
  },
  ssr: true,
  modules: [
    '@invictus.codes/nuxt-vuetify'
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    //apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.API_BASE,
      webBase: process.env.WEB_BASE,
      serviceAccountEmail: process.env.SERVICE_ACCOUNT_EMAIL,
    }
  },
  routeRules: {
    '/login': { redirect: 'http://localhost:3000/login' },
    //'/app': { redirect: '/app/sheets' },
    '/logout': { proxy: 'http://localhost:3000/logout' },
    '/getAccessLink': { proxy: 'http://localhost:3000/getAccessLink' },
    '/login/check': { proxy: 'http://localhost:3000/login/check' },
    '/httpbin/**': { proxy: 'http://httpbin.org/**'},
    '/api/**': { proxy: 'http://localhost:3000/api/**' },
    '/app/**': { ssr: false },
  }
})

