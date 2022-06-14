// nextJS update inside docker container fix
module.exports = {
    webpackDevMiddleware: config => {
      config.watchOptions.poll = 300;
      return config;
    }
  };