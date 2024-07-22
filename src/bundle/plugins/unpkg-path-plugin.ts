import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        // Handling the entry file.
        build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
          return { path: args.path, namespace: 'a' };
        })

        // Handling relative modules.
        build.onResolve({ filter: /^\.+\// }, async (args: any) => {
          return { 
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
            namespace: 'a'
          }
        })

        // Handling root modules.
        build.onResolve({ filter: /.*/ }, async (args: any) => {
          return {
            path: `https://unpkg.com/${args.path}`,
            namespace: 'a'
          }
        });
    },
  };
};