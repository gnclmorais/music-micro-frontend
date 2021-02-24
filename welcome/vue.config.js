module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Red Records  ♪  music label";

        return args;
      })
  }
}
