import {defineConfig} from'vite'
const fs = require('fs');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('certs/localhost.key'),
      cert: fs.readFileSync('certs/localhost.crt')
    },
    host: '0.0.0.0'
  },
  base: '/kyiv/'
})