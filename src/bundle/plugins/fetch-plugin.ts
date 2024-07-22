import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
    name: 'FileCache'
})

export const fetchPlugin = (code: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {

            // Load entry file.
            build.onLoad({ filter: /(^index\.js$)/}, () => {
                return {
                    loader: 'tsx',
                    contents: code
                }
            })

            // Check for module in cache
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)
                if(cachedResult) return cachedResult
            })


            // Load css modules by wrapping it in js as esbuild does not support load css and js together without a file system.
            build.onLoad({ filter: /\.css$/ }, async (args: any) => {                
                const { data, request } = await axios.get(args.path)
                const escapedCss = data.replace(/\n/g, '').replace(/'/g, '\'').replace(/"/g, '\"')

                const contents = `
                    const styleElement = document.createElement('style')
                    style.innerText = '${escapedCss}'
                    document.head.appendChild(styleElement)
                ` 
                const cachedFile: esbuild.OnLoadResult = {
                    loader: 'tsx',
                    contents ,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                // Store file in cache.
                await fileCache.setItem(args.path, cachedFile)
    
                return cachedFile
            })


            // Load any other modules.
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path)

                const cachedFile: esbuild.OnLoadResult = {
                    loader: 'tsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                // Store file in cache.
                await fileCache.setItem(args.path, cachedFile)
    
                return cachedFile
            });
        }
    }
}