// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      clients: {
        default: {
          host: 'http://localhost:8888/graphql',
          // introspectionHost: "http://localhost:3000/graphql"
        }
      },
      "graphql-client": {
        clients: {
          default: {
            host: "http://localhost:3000/graphql",
            clientHost: "http://localhost:3000/graphql"
          },
        },
      },
    }
  },
  nitro: {
    devProxy: {
      // https://portal1.xianzhiedu.com.cn/test
      "/graphql": {
        // target: 'https://portal1.xianzhiedu.com.cn/yunapp',
        target: 'http://localhost:8888/graphql',
        changeOrigin: true
      },
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        'nuxt-graphql-client > graphql-request' // Workaround for: https://github.com/Diizzayy/nuxt-graphql-client/issues/473
      ]
    },
  },
  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss'],
})