module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      ["@babel/preset-react", {
        "runtime": "automatic"
     }]
    ],
    plugins: [
      function () {
        return {
          visitor: {
            //replace import.meta with process.env
            MetaProperty(path) {
              path.replaceWithSourceString('process')
            },
          },
        }
      },
    ],
};