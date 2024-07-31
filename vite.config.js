import {defineConfig} from 'vite'
import monkey from 'vite-plugin-monkey';

export default defineConfig((config) => {
  return {
    build: {
      minify: 'esbuild'
    },
    server: {
      open: 'dist/tarmactechnologies.user.js'
    },
    plugins: [
      monkey({
        entry: 'src/index.js',
        userscript: {
          name: 'Tarmac Technologies',
          description: 'Miscellaneous Tarmac Technologies Utilities',
          namespace: null,
          icon: 'https://static-tarmac.s3.amazonaws.com/img/favicon.ico',
          downloadURL: 'https://github.com/tarmactechnologies/userscript/raw/main/dist/tarmactechnologies.user.js',
          updateURL: 'https://github.com/tarmactechnologies/userscript/raw/main/dist/tarmactechnologies.meta.js',
          match: [
            'https://backoffice.tarmactechnologies.com/*',
            'https://dev-backoffice.tarmactechnologies.com/*',
            'https://admin.tarmactechnologies.com/*',
            'https://dev-admin.tarmactechnologies.com/*',
            'https://agoa.tarmactechnologies.com/*',
            'https://dev-agoa.tarmactechnologies.com/*'
          ]
        },
        build: {
          fileName: 'tarmactechnologies.user.js',
          metaFileName: 'tarmactechnologies.meta.js'
        }
      })
    ]
  }
})
