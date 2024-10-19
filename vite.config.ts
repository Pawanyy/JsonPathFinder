import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '')
    const baseUrl = env.VITE_BASE_URL;

    return {
        plugins: [react(), Sitemap({ hostname: baseUrl })],
        build: {
            cssMinify: 'esbuild',
            minify: 'esbuild',
            cssCodeSplit: true,
            chunkSizeWarningLimit: 600,
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom', 'react-helmet'],
                        ace: ['react-ace'],
                    }
                }
            }
        }
    }
});
