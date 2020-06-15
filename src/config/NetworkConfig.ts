import GlobalConstant from '../util/GlobalConstant';
import AccountManager from "@/util/AccountManager";
let networkConfig = null;

export default class NetworkConfig {
  static getNetworkConfig() {
    if (networkConfig) {
      return networkConfig
    }
    let networkDelegate = {
      globalParams() {
        const openId = AccountManager.accountInfo().openId;
        const {site: {location, locationCity, userLocationCity}} = GlobalConstant.store.getState();
        const {cityId} = userLocationCity;
        const {hasLocation, ...coordinate} = location;
        return {
          cityId,
          coordinate,
          location: {
            cityId,
            ...coordinate
          },
          openId
        };
      },
      requestInterceptor(config) {
        config.params = {cipher: config.params.cipher};
        return config;
      },
      responseInterceptor(response) {
        return response;
      },
    };
    networkConfig = {
      baseUrl: GlobalConstant.baseUrl,
      delegate: networkDelegate,
      carryParams() {
        return {
        }
      },
      axiosConfig: {
        withCredentials: true
      },
      otherContent: {
        // inType: 'i-cmbc-film'
        inType: 'cgb'
      }
    };
    return networkConfig;
  }
}

