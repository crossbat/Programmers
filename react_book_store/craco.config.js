const cracoAlias = require('craco-alias');

module.exports = {
  Plugins: [
    {
      Plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: 'tsconfig.paths.json',
        debug: false
      }
    }
  ]
}
