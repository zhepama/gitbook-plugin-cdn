"use strict";

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
        return str.replace(p2, rootUrl + p2);
    });
}
/**
 *
 *
 * @param {*} htmlContent
 * @param {*} rootUrl
 * @returns
 */
function replaceJs(htmlContent,rootUrl)
{
    return htmlContent.replace(
        /<script(.*?)src="(.*?)"(.*?)>/gi,
        function (str, p1, p2) {
          //如果以http开头的图片则不处理
          if (p2.indexOf("http") === 0) {
            return str;
          }
          //如果以//开头的图片也不处理
          if (p2.indexOf("//") === 0) {
            return str;
          }
          return str.replace(p2, rootUrl + p2);
        }
      );
}
/**
 *
 *
 * @param {*} htmlContent
 * @param {*} rootUrl
 * @returns
 */
function replaceImg(htmlContent,rootUrl)
{
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
        return str.replace(p2, rootUrl + p2);
      });
}


function process(htmlContent) {
    htmlContent = replaceLink(htmlContent, this.config.cdn.url);
    htmlContent = replaceJs(htmlContent, this.config.cdn.url);
    htmlContent = replaceImg(htmlContent, this.config.cdn.img_url);
    return htmlContent;
  }

module.exports.processPage = function (page) {
  data.content = process.call(this.book, page.content);
  return data;
};
