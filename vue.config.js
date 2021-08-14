module.exports = {
  lintOnSave: false,
  css: {
    extract: process.env.NODE_ENV !== 'development',
    sourceMap:true,
    requireModuleExtension: true,	
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    },
    modules:true
  }
}