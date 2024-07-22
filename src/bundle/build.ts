import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const build = async (input: string) => {
    const res = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(), 
          fetchPlugin(input)
        ],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        }
    })
    return res.outputFiles[0].text
}

export default build;