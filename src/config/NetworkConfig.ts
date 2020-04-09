import GlobalConstant from '../util/GlobalConstant';
let networkConfig = null;

export default class NetworkConfig {
  static getNetworkConfig() {
    if (networkConfig) {
      return networkConfig
    }
    let networkDelegate = {
      globalParams() {
        return {
        };
      },
      requestInterceptor(config) {
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
        inType: 'cmbc'
      }
    };
    return networkConfig;
  }
}

