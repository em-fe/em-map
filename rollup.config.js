
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import dartSass from 'sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import vueJsx from 'rollup-plugin-vue-jsx-compat';

// "vite": "^2.3.8",

const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;
  

export default {
    // input: 'src/lib/index.ts',
    input: 'src/lib/index.js',
    output: [
        {
        globals: {
            vue: 'Vue',
            '@ant-design/icons-vue': '@ant-design/icons-vue',
        },
        exports: 'named',
        name: 'em-map',
        file: 'dist/em-map.js',
        format: 'umd',
        banner: Global,
        // plugins: [terser()]
    }, 
    {
        globals: {
            vue: 'Vue',
            '@ant-design/icons-vue': '@ant-design/icons-vue',
        },
        exports: 'named',
        file: 'dist/em-map.esm.js',
        format: 'es',
        banner: Global,
        // plugins: [terser()]
    }],
    plugins: [
        json(),
        // resolve({ preferBuiltins: false, mainFields: ['browser'] }),
        // ts({
        //   check: process.env.NODE_ENV === 'production',
        //   tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        //   cacheRoot: path.resolve(__dirname, 'node_modules/.cache_ts'),
        //   tsconfigOverride: {
        //     compilerOptions: {
        //       sourceMap: false,
        //       declaration: true,
        //       declarationMap: true
        //     },
        //     exclude: ['**/__tests__', 'test-dts']
        //   }
        // }),

        vueJsx(),
        esbuild({
          jsxFactory: "vueJsxCompat",
        }),

        // esbuild({
        //   include: /\.tsx?$/, // default, inferred from `loaders` option
        //   // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
        //   exclude: /node_modules/, // default
        //   sourceMap: false, // default
        //   minify: process.env.NODE_ENV === 'production',
        //   target: 'esnext', // default, or 'es20XX', 'esnext'
        //   jsx: 'transform', // default, or 'preserve'
        //   jsxFactory: 'vueJsxCompat',
        //   experimentalBundling:true,
        //   // Like @rollup/plugin-replace
        //   define: {
        //     __VERSION__: '"x.y.z"',
        //   },
        //   tsconfig: path.resolve(__dirname, 'tsconfig.json'), // default
        //   // Add extra loaders
        //   loaders: {
        //     // Add .json files support
        //     // require @rollup/plugin-commonjs
        //     // '.json': 'json',
        //     // Enable JSX in .js files too
        //     '.js': 'jsx',
        //   },
        // }),
        vue({
            include: /\.vue$/,
            // target: 'browser',
            compileTemplate: true,
        }),
        nodeResolve(),
        commonjs(),
        scss({ include: /\.scss$/, sass: dartSass }),
        // babel({
        //   exclude: 'node_modules/**',
        //   extensions: ['.js', '.jsx', '.vue'],
        //   babelHelpers: 'bundled'
        // }),
    ],
    external: ["vue", "@ant-design/icons-vue"],
}
