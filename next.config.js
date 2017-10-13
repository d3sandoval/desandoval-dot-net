module.exports = {
  webpack: (config) => {
    // Remove minifed react aliases for material-ui so production builds work
    if (config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']
    }

    // hack to get rss-parser working
    // see: https://github.com/bobby-brennan/rss-parser/issues/20
    config.node = {fs: "empty"};

    return config
  }
}
