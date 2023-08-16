import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
//dev-memo If I need to use IP address, check this -> https://zenn.dev/hiiiita/articles/a4881dab7226aa
export default defineConfig({
  base: './', //Use relative path
  root: './src', //Define dev directory
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          if (extType === 'css') {
            return `assets/css/style.css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/ts/main.ts',
        entryFileNames: 'assets/ts/main.ts',
      },
    },
    
  }, 
  plugins: [react()],
})
