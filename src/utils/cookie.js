const CookieUtil = {
  /**
   * 获取所有 Cookies，并将其转换为对象
   * 使用 reduce 解析 cookie 字符串
   */
  getCookies: function () {
    return document.cookie.split("; ").reduce((prev, cookieStr) => {
      const [key, value] = cookieStr.split("=");
      prev[decodeURIComponent(key)] = decodeURIComponent(value);
      return prev;
    }, {});
  },

  /**
   * 设置一个 Cookie
   * @param {string} name - Cookie 名称
   * @param {string} value - Cookie 值
   * @param {number} [days] - 过期天数
   * @param {string} [path] - Cookie 路径
   */
  setCookie: function (name, value, days, path = "/") {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (days) {
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + days * 24 * 60 * 60 * 1000
      );
      cookieStr += `; expires=${expirationDate.toUTCString()}`;
    }

    cookieStr += `; path=${path}`;
    document.cookie = cookieStr;
  },

  /**
   * 获取单个 Cookie 的值
   * @param {string} name - Cookie 名称
   * @returns {string | null} - Cookie 值或 null
   */
  getCookie: function (name) {
    const cookies = this.getCookies();
    return cookies[name] || "";
  },

  /**
   * 删除一个 Cookie
   * @param {string} name - Cookie 名称
   * @param {string} [path] - Cookie 路径
   */
  deleteCookie: function (name, path) {
    this.setCookie(name, "", -1, path);
  },
};

export default CookieUtil

