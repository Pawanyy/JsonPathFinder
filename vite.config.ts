import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Sitemap from 'vite-plugin-sitemap'

function getOutputDirectory(defaultDir = 'dist') {
    const outDirIndex = process.argv.indexOf('--outDir');
    let outDir = defaultDir;

    if (outDirIndex !== -1 && process.argv[outDirIndex + 1]) {
        outDir = process.argv[outDirIndex + 1];
    }

    return outDir;
}

export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {

    const env = loadEnv(mode, process.cwd(), '')
    const baseUrl = env.VITE_BASE_URL;

    const outDir = getOutputDirectory();

    console.log('Output directory:', outDir);

    return {
        plugins: [react(), Sitemap({
            hostname: baseUrl, outDir: outDir
        })],
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
