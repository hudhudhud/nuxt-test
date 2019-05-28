import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    '@/assets/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/iview',
    '@/plugins/axios',
    '@/plugins/vue-inject.js',
    '@/plugins/context-inject.js',
    '@/plugins/combined-inject.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios:{
    // proxyHeaders: false
    proxy: true,
    prefix: '/api',// 表示给请求url加个前缀 /apis
    credentials: true, // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target:'https://www.easy-mock.com/mock/5c19ec74bde1915e93ca1a92/example/',
      pathRewrite: {
        '^/api': '',
        changeOrigin: true // 表示是否跨域
      }
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
}
