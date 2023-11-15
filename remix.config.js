/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      crypto: true,
      perf_hooks: true,
      'fs/promises': true,
      child_process: true,
      stream: true,
      fs: true,
    },
  },
};
