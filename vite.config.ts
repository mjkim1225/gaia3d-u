import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  cesium()],
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium'),
    ASSET_SERVER: JSON.stringify('http://seoul.gaia3d.com:10912')
  },
})
