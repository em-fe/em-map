import { UserConfig } from 'vite';

const { resolve } = require('path');

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export function pathResolve(dir: string) {
  return resolve(__dirname, '../', dir);
}

export default (): UserConfig => {
  const root = process.cwd();
  return {
    base: process.env.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          // @@xxxx  =>  src/xxx
          find: /^\@@/,
          replacement: `${pathResolve('demo')}/`,
        },
        {
          // @@xxxx  =>  src/xxx
          find: /^em-map/,
          replacement: `${pathResolve('src')}/lib/`,
        },
      ],
    },
    server: {
      port: 3001,
      // Load proxy configuration from .env
      hmr: {
        overlay: true,
      },
    },

    build: {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
        }
      },
      outDir: '_site',
      polyfillDynamicImport: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: true,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    define: {
    },
    css: {
      preprocessorOptions: {
        scss: {
        }
      },
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: [
      vue({
        include: [/\.vue$/],
      }),
      vueJsx(),
    ],
  };
};
