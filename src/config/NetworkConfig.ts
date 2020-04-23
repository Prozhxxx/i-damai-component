import GlobalConstant from '../util/GlobalConstant';
let networkConfig = null;

export default class NetworkConfig {
  static getNetworkConfig() {
    if (networkConfig) {
      return networkConfig
    }
    let networkDelegate = {
      globalParams() {
        const {location, locationCity, useLocationCity} = GlobalConstant.store.getState();
        const {cityId} = locationCity;
        const {hasLocation, ...coordinate} = location
        return {
          cityId,
          coordinate,
          location: {
            cityId,
            ...coordinate
          }
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
        inType: 'cmbc'
      }
    };
    return networkConfig;
  }
}

