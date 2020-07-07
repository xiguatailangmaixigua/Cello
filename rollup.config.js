// rollup.config.js
const path = require('path')
const baseConfig = require('create-rollup-config');
import html from "rollup-plugin-html";
import babel from 'rollup-plugin-babel';

const config = baseConfig({
    alias: {
        $common: './src/common',
    },
    replace: {
        env: JSON.stringify(process.env.NODE_ENV)
    },
    serve: {
        port: 7001
    },
    livereload: {
        watch: '/src' // default
    },
    treeshake: false,
})

export default [
    {
        input: './src/app.js',
        plugins: [
            html({
              include: "./*.html",
            })
        ],
        output: [
            {
                file: './dist/app.js',
                format: 'cjs'
            }
        ],
        ...config
    }
]