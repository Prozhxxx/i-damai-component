import {Store} from 'redux';
const BASE_URL = 'https://beta.jinbaozheng.com/film-web/';

class GlobalConstant {
  static o = undefined;
  static baseUrl = BASE_URL;
  // 网络请求超时时间
  static timeout = 8888;
  static store: Store = null;
}

export default GlobalConstant;
export const baseUrl = GlobalConstant.baseUrl;

