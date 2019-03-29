const path = require('path')

module.exports = {
  entry: 'src/index.js',
  output: {
    dir: 'docs'
  },
  chainWebpack(config) {
    config.resolve.alias.set('@comps', path.resolve(__dirname, 'src/comps'))

    config.plugin('auto-routes').use(
      require('vue-auto-routes/plugin'), [
        {
          dir: path.resolve(__dirname, 'src/views')
        }
      ]
    )
  }
}
