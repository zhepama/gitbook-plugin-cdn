"use strict";
var fs = require("fs"),
  path = require("path");
/**
 *
 *
 * @param {*} htmlContent
 * @param {*} rootUrl
 * @returns
 */
function replaceLink(htmlContent, rootUrl) {
  return htmlContent.replace(/<link(.*?)href="(.*?)"(.*?)>/gi, function (
    str,
    p1,
    p2
  ) {
    //如果以http开头的图片则不处理
    if (p2.indexOf("http") === 0) {
      return str;
    }
    //如果以//开头的图片也不处理
    if (p2.indexOf("//") === 0) {
      return str;
    }
    //如果不包含gitbook,则不处理
    if (p2.indexOf("gitbook") === -1) {
      return str;
    }
    return str.replace(p2,rootUrl+p2.substr(p2.indexOf("gitbook")));
  });
}
/**
 *
 *
 * @param {*} htmlContent
 * @param {*} rootUrl
 * @returns
 */
function replaceJs(htmlContent, rootUrl) {
  return htmlContent.replace(/<script(.*?)src="(.*?)"(.*?)>/gi, function (
    str,
    p1,
    p2
  ) {
    //如果以http开头的图片则不处理
    if (p2.indexOf("http") === 0) {
      return str;
    }
    //如果以//开头的图片也不处理
    if (p2.indexOf("//") === 0) {
      return str;
    }
    //如果不包含gitbook,则不处理
    if (p2.indexOf("gitbook") === -1) {
      return str;
    }
    return str.replace(p2,rootUrl+p2.substr(p2.indexOf("gitbook")));
  });
}
/**
 *
 *
 * @param {*} htmlContent
 * @param {*} rootUrl
 * @returns
 */
function replaceImg(htmlContent, rootUrl) {
  return htmlContent.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (
    str,
    p1,
    p2
  ) {
    //如果是data:格式的则不处理
    if (/src="data:image(.*?)/gi.test(str)) {
      return str;
    }
    //如果以http开头的图片则不处理
    if (p2.indexOf("http") === 0) {
      return str;
    }
    //如果以//开头的图片也不处理
    if (p2.indexOf("//") === 0) {
      return str;
    }
    return str.replace(p2, rootUrl+p2);
  });
}

function process(htmlContent) {
  let config = this.config.values.pluginsConfig;
  htmlContent = replaceLink(htmlContent, config.cdn.url);
  htmlContent = replaceJs(htmlContent, config.cdn.url);
  htmlContent = replaceImg(htmlContent, config.cdn.img_url);
  return htmlContent;
}

function recursiveFiles(dirPath) {
  var book = this;
  fs.readdir(dirPath, function (err, files) {
    if (err) throw err;
    files
      .map(function (fileName) {
        // fileName to filePath
        return path.join(dirPath, fileName);
      })
      .forEach(function (filePath) {
        if (
          fs.statSync(filePath).isFile() &&
          filePath.match(/\.html$/) !== null
        ) {
          var htmlContent = fs.readFileSync(filePath, "utf8");
          htmlContent = process.call(book, htmlContent);
          fs.writeFileSync(filePath, htmlContent);
        } else if (fs.statSync(filePath).isDirectory()) {
          // recursive
          recursiveFiles.call(book, filePath);
        }
      });
  });
}

module.exports.processFinish = function () {
  let dirPath = this.output.root();
  recursiveFiles.call(this, dirPath);
};
