module.exports = {
  runtimeCompiler: true,

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
      },
    },
  },
};
