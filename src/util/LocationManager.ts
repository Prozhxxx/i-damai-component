import AMap from 'AMap'
import GlobalConstant from './GlobalConstant'

const openAppLocation = false;
let instance = null;
class LocationManager {
  private nativeLocationCallback = null;
  private _hasLocation = false;

  constructor () {
    if (!instance) {
      global.locationCallback = this.locationCallback.bind(this)
      instance = this
    }
    return instance
  }

  static defaultManager () {
    return new LocationManager()
  }

  locationCallback (location) {
    if (this.nativeLocationCallback) {
      this.nativeLocationCallback(location)
    }
  }

  getNativeLocation () {
    return new Promise<{longitude, latitude}>((resolve, reject) => {
      this.nativeLocationCallback = (location) => {
        resolve(location)
      };
      try {
        global.nativeLocation()
      } catch (e) {
        resolve(null);
      }
    })
  }

  nativeLocationNull (location) {
    if (!location) {
      return true
    }
    if (!location.hasOwnProperty('longitude') || !location.hasOwnProperty('latitude')) {
      return true
    }
    if (location.longitude === '(null)' || location.latitude === '(null)') {
      return true
    }
    return false
  }

  /**
   * 获取定位（经纬度）
   * @returns {Promise} 第一个参数为error类型 第二个参数为{latitude，longitude}
   */
  getLocation () {
    if (openAppLocation) {
      return new Promise((resolve, reject) => {
            Promise.race([this.appLocationTimeOutPromise(), this.getNativeLocation()])
                .then((location) => {
                  let longitude = null
                  let latitude = null
                  if (!this.nativeLocationNull(location)) {
                    longitude = location.longitude
                    latitude = location.latitude
                  }
                  this.handleLocationPromise(longitude, latitude).then(location => {
                    this.updateLocationStore(location)
                    resolve(location)
                  }, error => {
                    this.updateLocationStore();
                    reject(error)
                  })
                }, error => {
                  this.updateLocationStore();
                  reject(error)
                })
          }
      )
    } else {
      return this.handleLocationPromise().then(location => {
        this.updateLocationStore(location);
        return location;
      }, error => {
        this.updateLocationStore();
        throw error
      })
    }
  }

  /**
   * app定位超时处理
   */
  appLocationTimeOutPromise () {
    return new Promise<{longitude, latitude}>((resolve, reject) => {
      setTimeout(() => {
        resolve({longitude: null, latitude: null})
      }, 1500)
    })
  }

  /**
   * 定位处理回调
   * @param longitude 定位到得经纬度
   * @param latitude 定位到的经纬度
   */
  handleLocationPromise (longitude?, latitude?) {
    if (longitude && latitude) {
      return Promise.resolve({longitude, latitude})
    } else {
      return this.gaodeLocatePromise().then(location => {
        return (location)
      }, error => {
        throw error
      })
    }
  }

  /**
   * 高德定位
   */
  gaodeLocatePromise () {
    return new Promise((resolve, reject) => {
      // 开始百度定位
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1500,
          GeoLocationFirst: true,
          noIpLocate: 3
        });
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          const {position, accuracy} = data;
          const longitude = position.getLng();
          const latitude = position.getLat();
          if (accuracy < 1000){
            resolve({
              latitude,
              longitude
            })
          } else {
            reject('精确度过低')
          }
        }

        function onError (errorData) {
          reject(errorData.message)
        }
      })
    })
  }

  updateLocationStore (location?) {
    if (location) {
      this._hasLocation = true
      GlobalConstant.store.dispatch({
        type: 'UPDATE_LOCATION_MUTATION',
        data: {
          latitude: location.latitude,
          longitude: location.longitude,
          hasLocation: true
        }
      })
    } else {
      this._hasLocation = false
      GlobalConstant.store.dispatch({
        type: 'UPDATE_LOCATION_MUTATION'
      })
    }
  }
}

export default LocationManager
