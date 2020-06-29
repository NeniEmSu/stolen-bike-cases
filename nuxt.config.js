module.exports = {
  mode: 'universal',

  head: {
    title: 'Stolen Bike Cases' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Music tabs tracker for fullstack apps' ||
          process.env.npm_package_description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#fff' },

  css: ['sweetalert2/dist/sweetalert2.min.css'],

  plugins: ['~/plugins/bootstrap-vue-icon'],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/moment',
  ],

  modules: [
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
  ],

  axios: {},

  build: {
    extend(config, ctx) {},
  },
}
