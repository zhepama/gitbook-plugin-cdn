module.exports = {
  hooks: {
    init: function () {
      let config = this.config.values.pluginsConfig;
      if (config.cdn.img_url === undefined) {
        config.cdn.img_url = config.cdn.url;
      } else if (
        config.cdn.img_url.indexOf("http") !== 0 &&
        config.cdn.img_url.indexOf("//") !== 0
      ) {
        config.cdn.img_url = config.cdn.url + config.cdn.img_url;
      }
    },
    finish: require('./lib/process').processFinish
  },
};
