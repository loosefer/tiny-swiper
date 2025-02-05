import path from 'path'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { eslint } from "rollup-plugin-eslint"

const isBuildProd = process.env.NODE_ENV === 'production'

const entries = [
    {
        input: 'index.js',
        compress: isBuildProd,
        options: {
            name: 'Swiper'
        }
    },
    {
        input: 'index.full.js',
        compress: isBuildProd,
        options: {
            name: 'Swiper',
            entryFileNames: '[name].js'
        }
    },
    {
        input: 'index.esm.js',
        compress: false,
        options: {
            name: 'Swiper',
            format: 'es',
            entryFileNames: '[name].js'
        }
    },
    {
        input: 'modules/pagination.js',
        compress: isBuildProd,
        options: {
            name: 'SwiperPluginPagination'
        }
    },
    {
        input: 'modules/lazyload.js',
        compress: isBuildProd,
        options: {
            name: 'SwiperPluginLazyload'
        }
    },
    {
        input: 'modules/keyboardControl.js',
        compress: isBuildProd,
        options: {
            name: 'SwiperPluginKeyboardControl'
        }
    }
]
const plugins = [
    eslint(),
    babel()
]

function genConfig (entries) {
    return entries.map(entry => {
        return {
            input: path.resolve('src', entry.input),
            plugins: [
                ...plugins,
                entry.compress ? uglify() : null
            ],
            output: {
                dir: path.resolve('lib', path.dirname(entry.input)),
                format: 'umd',
                sourcemap: !isBuildProd,
                entryFileNames: isBuildProd ? '[name].min.js' : '[name].js',
                ...entry.options
            }
        }
    })
}

export default genConfig(entries)
